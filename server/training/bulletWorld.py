import random

# import time
import pybullet as p
import pybullet_data

from server.engine.actuators.mainActuator import process_action
from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap, rotationSwap


class PyBulletWorld:
    def __init__(self):
        self.client = None
        self.entity_mapping = {}

    def load(self):
        if self.client is not None:
            try:
                p.disconnect(self.client)
            except Exception:
                pass
        self.client = p.connect(p.DIRECT)
        self.entity_mapping = {}
        p.setAdditionalSearchPath(pybullet_data.getDataPath())
        p.setGravity(0, 0, -9.81, physicsClientId=self.client)
        p.setTimeStep(1 / 60, physicsClientId=self.client)
        p.loadURDF("plane.urdf", physicsClientId=self.client)

    def spawn_entities(self, entities_config, highestDistance, spawn_mode):
        # IMPORTANT: must use shallow list — randomize_entities_open_space mutates
        # entity.position in-place on the original objects so that runtime.entities
        # stays in sync. deepcopy here would break OBS for all non-agent entities.
        entities_config = list(entities_config)
        if spawn_mode == "Random":
            entities_config = self.randomize_entities_open_space(
                entities_config, highestDistance
            )
        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

    def randomize_entities_open_space(self, entConfigCopy, highestDistance):

        TAG_PRIORITY = {
            "agent": 0,
            "Pickable Object": 1,
            "Collectible Object": 1,
            "target": 2,
            "deposit": 3,
        }

        entConfigCopy = sorted(entConfigCopy, key=lambda e: TAG_PRIORITY.get(e.tag, 99))

        agentConfig = next((e for e in entConfigCopy if e.tag == "agent"), None)
        if agentConfig is None:
            return entConfigCopy

        agentRandomPos = self.random_position_around(
            agentConfig.position, min_dist=2.0, max_dist=highestDistance
        )
        if agentRandomPos is None:
            return entConfigCopy
        agentConfig.position = agentRandomPos
        agentId = agentConfig.id
        lastPos = agentRandomPos

        for obj in entConfigCopy:
            if obj.id == agentId:
                continue

            success = False
            for _ in range(100):
                objRandomPos = self.random_position_around(
                    lastPos, min_dist=2.0, max_dist=highestDistance * 0.75
                )
                if objRandomPos:
                    obj.position = objRandomPos
                    lastPos = objRandomPos
                    success = True
                    break

            if not success:
                print(f"Failed to randomize {obj.id}")

        return entConfigCopy

    def random_position_around(self, center, min_dist, max_dist):
        for _ in range(100):
            x = random.uniform(center[0] - max_dist, center[0] + max_dist)
            z = random.uniform(center[2] - max_dist, center[2] + max_dist)
            y = center[1]

            dist = distance3D(center, [x, y, z])

            x = max(-20, min(20, x))
            z = max(-20, min(20, z))

            if min_dist < dist < max_dist:
                return [x, y, z]

        return None

    def get_entity_state(self, entity_id):
        bullet_id = self.entity_mapping[entity_id]
        pos, rot = p.getBasePositionAndOrientation(
            bullet_id, physicsClientId=self.client
        )
        euler = p.getEulerFromQuaternion(rot, physicsClientId=self.client)
        return pos, euler

    def apply_actions(self, actions, entities):
        for agent_id, action in actions.items():
            agentData = entities[agent_id]
            process_action(
                agent_id, agentData, action, self.entity_mapping, self.client, entities
            )

    def spawn(self, entity):
        positionEntity = positionSwap(entity.position)
        rotationEntity = rotationSwap(entity.quatRotation)
        colliderEntity = entity.collider
        bullet_id = None
        if entity.tag == "agent":
            bullet_id = self.spawn_agent(positionEntity, rotationEntity, colliderEntity)
        elif entity.tag == "non_state":
            bullet_id = self.spawn_non_state(
                positionEntity, rotationEntity, colliderEntity
            )
        elif entity.tag == "target":
            bullet_id = self.spawn_target(
                positionEntity, rotationEntity, colliderEntity
            )
        elif entity.tag in ("Pickable Object", "Collectible Object"):
            bullet_id = self.spawn_holders(
                positionEntity, rotationEntity, colliderEntity
            )
        elif entity.tag == "deposit":
            bullet_id = self.spawn_deposit(
                positionEntity, rotationEntity, colliderEntity
            )
        elif entity.tag == "generic":
            pass
        else:
            raise ValueError(
                f"spawn() received unknown entity tag '{entity.tag}' "
                f"(id={entity.id}). Add a spawn branch for this tag."
            )

        return bullet_id

    def step_simulation(self, steps=1):
        for _ in range(steps):
            p.stepSimulation(physicsClientId=self.client)
            # time.sleep(1 / 60)

    def settle(self, steps=2):
        for _ in range(steps):
            p.stepSimulation(physicsClientId=self.client)

    def spawn_agent(self, pos, rot, collider):
        r = collider.get("r", 0.3)
        h = collider.get("h", 2.0)
        cylinder_height = max(0.0, h - 2 * r)
        collision_shape = p.createCollisionShape(
            p.GEOM_CAPSULE,
            radius=r,
            height=cylinder_height,
            physicsClientId=self.client,
        )

        body_id = p.createMultiBody(
            baseMass=1,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

        p.changeDynamics(
            body_id,
            -1,
            localInertiaDiagonal=(0, 0, 0.05),
            physicsClientId=self.client,
        )
        p.setCollisionFilterGroupMask(body_id, -1, 1, 1, physicsClientId=self.client)

        return body_id

    def spawn_non_state(self, pos, rot, collider):
        shape = collider.get("shape", "capsule")
        if shape == "box":
            h = collider["h"]
            collision_shape = p.createCollisionShape(
                p.GEOM_BOX,
                halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
                physicsClientId=self.client,
            )
            h = collider["h"]
            px, py, pz = pos
            pos = (px, py, h / 2)
        else:
            r = collider.get("r", 0.3)
            h = collider.get("h", 1.0)
            cylinder_height = max(0.0, h - 2 * r)
            collision_shape = p.createCollisionShape(
                p.GEOM_CAPSULE,
                radius=r,
                height=cylinder_height,
                physicsClientId=self.client,
            )
            px, py, pz = pos
            pos = (px, py, h / 2)
        return p.createMultiBody(
            baseMass=0,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

    def spawn_target(self, pos, rot, collider):
        r = collider["r"]
        h = collider["h"]
        cylinder_height = max(0.0, h - 2 * r)
        collision_shape = p.createCollisionShape(
            p.GEOM_CAPSULE,
            radius=r,
            height=cylinder_height,
            physicsClientId=self.client,
        )
        px, py, _ = pos
        pos = (px, py, h / 2)
        return p.createMultiBody(
            baseMass=0,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

    def spawn_holders(self, pos, rot, collider):
        r = collider["r"]
        h = collider["h"]
        cylinder_height = max(0.0, h - 2 * r)
        collision_shape = p.createCollisionShape(
            p.GEOM_CAPSULE,
            radius=r,
            height=cylinder_height,
            physicsClientId=self.client,
        )
        px, py, _ = pos
        pos = (px, py, h / 2)
        return p.createMultiBody(
            baseMass=0,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

    def spawn_deposit(self, pos, rot, collider):
        r = collider["r"]
        h = collider["h"]
        cylinder_height = max(0.0, h - 2 * r)
        collision_shape = p.createCollisionShape(
            p.GEOM_CAPSULE,
            radius=r,
            height=cylinder_height,
            physicsClientId=self.client,
        )
        px, py, _ = pos
        pos = (px, py, h / 2)
        return p.createMultiBody(
            baseMass=0,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

    def disconnect(self):
        if self.client is not None:
            try:
                p.disconnect(self.client)
            except Exception:
                pass
            self.client = None
