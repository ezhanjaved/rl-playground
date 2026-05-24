import copy
import random
import time

import pybullet as p
import pybullet_data

from server.engine.actuators.mainActuator import process_action
from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap, rotationSwap


class PyBulletWorld:
    def __init__(self):
        self.client = None
        self.entity_mapping = {}
        self.debug_axis_ids = []
        self.debug_label_ids = []

        # Turn this off if you do not want coordinate helpers in the PyBullet GUI.
        self.debug_coordinates = True

    def load(self):
        if self.client is not None:
            try:
                p.disconnect(self.client)
            except Exception:
                pass
        self.client = p.connect(p.GUI)
        self.entity_mapping = {}
        p.setAdditionalSearchPath(pybullet_data.getDataPath())
        p.setGravity(0, 0, -9.81, physicsClientId=self.client)
        p.setTimeStep(1 / 60, physicsClientId=self.client)
        p.loadURDF("plane.urdf", physicsClientId=self.client)

        if self.debug_coordinates:
            self.draw_world_axes()
            self.reset_debug_camera()

    def spawn_entities(self, entities_config, highestDistance, spawn_mode):
        if spawn_mode == "Random":
            entities_config = self.randomize_entities(entities_config, highestDistance)

        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

            if self.debug_coordinates and bullet_id is not None:
                self.draw_entity_debug(entity, bullet_id)

    def draw_world_axes(self, axis_length=10):
        """Draw PyBullet world axes in the GUI.

        PyBullet coordinate convention used here:
            +X = right
            +Y = forward/ahead
            +Z = up
        """
        self.debug_axis_ids.clear()
        self.debug_label_ids.clear()

        # Axis lines: X red, Y green, Z blue.
        self.debug_axis_ids.append(
            p.addUserDebugLine(
                [0, 0, 0],
                [axis_length, 0, 0],
                [1, 0, 0],
                lineWidth=4,
                lifeTime=0,
                physicsClientId=self.client,
            )
        )
        self.debug_axis_ids.append(
            p.addUserDebugLine(
                [0, 0, 0],
                [0, axis_length, 0],
                [0, 1, 0],
                lineWidth=4,
                lifeTime=0,
                physicsClientId=self.client,
            )
        )
        self.debug_axis_ids.append(
            p.addUserDebugLine(
                [0, 0, 0],
                [0, 0, axis_length],
                [0, 0, 1],
                lineWidth=4,
                lifeTime=0,
                physicsClientId=self.client,
            )
        )

        # Negative ground axes are useful for left/back debugging.
        self.debug_axis_ids.append(
            p.addUserDebugLine(
                [0, 0, 0],
                [-axis_length, 0, 0],
                [1, 0.4, 0.4],
                lineWidth=2,
                lifeTime=0,
                physicsClientId=self.client,
            )
        )
        self.debug_axis_ids.append(
            p.addUserDebugLine(
                [0, 0, 0],
                [0, -axis_length, 0],
                [0.4, 1, 0.4],
                lineWidth=2,
                lifeTime=0,
                physicsClientId=self.client,
            )
        )

        self.add_debug_label(
            f"+X right [{axis_length}, 0, 0]",
            [axis_length + 0.5, 0, 0.3],
            color=[1, 0, 0],
        )
        self.add_debug_label(
            f"-X left [-{axis_length}, 0, 0]",
            [-axis_length - 3.0, 0, 0.3],
            color=[1, 0.4, 0.4],
        )
        self.add_debug_label(
            f"+Y ahead [0, {axis_length}, 0]",
            [0, axis_length + 0.5, 0.3],
            color=[0, 1, 0],
        )
        self.add_debug_label(
            f"-Y back [0, -{axis_length}, 0]",
            [0, -axis_length - 1.5, 0.3],
            color=[0.4, 1, 0.4],
        )
        self.add_debug_label(
            f"+Z up [0, 0, {axis_length}]",
            [0, 0, axis_length + 0.5],
            color=[0, 0, 1],
        )
        self.add_debug_label(
            "Origin [0, 0, 0]",
            [0.3, 0.3, 0.3],
            color=[1, 1, 1],
        )

    def add_debug_label(self, text, pos, color=None, text_size=1.2):
        if color is None:
            color = [1, 1, 1]

        label_id = p.addUserDebugText(
            text,
            pos,
            textColorRGB=color,
            textSize=text_size,
            lifeTime=0,
            physicsClientId=self.client,
        )
        self.debug_label_ids.append(label_id)
        return label_id

    def draw_entity_debug(self, entity, bullet_id):
        """Add a label and height marker for each spawned entity."""
        pos, quat = p.getBasePositionAndOrientation(
            bullet_id, physicsClientId=self.client
        )
        x, y, z = pos

        # Vertical marker from ground to entity center.
        p.addUserDebugLine(
            [x, y, 0],
            [x, y, z + 0.75],
            [1, 1, 0],
            lineWidth=2,
            lifeTime=0,
            physicsClientId=self.client,
        )

        label = (
            f"{entity.tag} | id={entity.id}\n"
            f"client pos={list(entity.position)}\n"
            f"bullet pos=[{x:.3f}, {y:.3f}, {z:.3f}]"
        )
        self.add_debug_label(label, [x, y, z + 1.0], color=[1, 1, 0], text_size=1.0)

    def reset_debug_camera(self):
        p.resetDebugVisualizerCamera(
            cameraDistance=35,
            cameraYaw=45,
            cameraPitch=-60,
            cameraTargetPosition=[0, 0, 0],
            physicsClientId=self.client,
        )

    def randomize_entities(self, entConfigCopy, highestDistance):

        # entConfigCopy = copy.deepcopy(entConfigCopy)

        agentConfig = None

        for entity in entConfigCopy:
            if entity.tag == "agent":
                agentConfig = entity
                break

        if agentConfig is None:
            return entConfigCopy

        agentRandomPos = self.random_position(agentConfig.position)
        agentConfig.position = agentRandomPos

        for obj in entConfigCopy:
            if obj.tag == "agent":
                continue

            success = False
            max_attempts = 100

            for _ in range(max_attempts):
                objRandomPos = self.random_position(obj.position)

                dist = distance3D(agentRandomPos, objRandomPos)

                if 2.0 < dist < highestDistance:
                    obj.position = objRandomPos
                    success = True
                    break

            if not success:
                print(f"Failed to randomize {obj.id}")

        return entConfigCopy

    def random_position(self, position):
        x = random.uniform(-20, 20)
        z = random.uniform(-20, 20)
        y = position[1]
        return [x, y, z]

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
            time.sleep(1 / 60)

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
