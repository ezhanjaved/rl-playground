import pybullet as p
import pybullet_data

from server.engine.actuators.mainActuator import process_action
from server.utilities.positionSwap import positionSwap, rotationSwap


class PyBulletWorld:
    def __init__(self, scenario):
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

    def spawn_entities(self, entities_config):
        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

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
        bullet_id = None
        if entity.tag == "agent":
            bullet_id = self.spawn_agent(positionEntity, rotationEntity)
        elif entity.tag == "non_state":
            bullet_id = self.spawn_non_state(positionEntity, rotationEntity)
        elif entity.tag == "target":
            bullet_id = self.spawn_target(positionEntity, rotationEntity)
        elif entity.tag in ("Pickable Object", "Collectible Object"):
            bullet_id = self.spawn_holders(positionEntity, rotationEntity)
        elif entity.tag == "deposit":
            bullet_id = self.spawn_deposit(positionEntity, rotationEntity)
        else:
            raise ValueError(
                f"spawn() received unknown entity tag '{entity.tag}' "
                f"(id={entity.id}). Add a spawn branch for this tag."
            )

        return bullet_id

    def step_simulation(self, steps=5):
        for _ in range(steps):
            p.stepSimulation(physicsClientId=self.client)

    def settle(self, steps=2):
        for _ in range(steps):
            p.stepSimulation(physicsClientId=self.client)

    def spawn_agent(self, pos, rot):
        return p.loadURDF(
            "r2d2.urdf", pos, rot, useFixedBase=True, physicsClientId=self.client
        )

    def spawn_non_state(self, pos, rot):
        return p.loadURDF(
            "cube.urdf", pos, rot, useFixedBase=True, physicsClientId=self.client
        )

    def spawn_target(self, pos, rot):
        return p.loadURDF(
            "cube.urdf", pos, rot, useFixedBase=True, physicsClientId=self.client
        )

    def spawn_holders(self, pos, rot):
        x, y, z = pos
        z = z - 0.5
        pos = [x, y, z]
        return p.loadURDF(
            "cube.urdf",
            pos,
            rot,
            useFixedBase=True,
            globalScaling=0.2,
            physicsClientId=self.client,
        )

    def spawn_deposit(self, pos, rot):
        x, y, z = pos
        z = z - 0.5
        pos = [x, y, z]
        return p.loadURDF(
            "cube.urdf",
            pos,
            rot,
            useFixedBase=True,
            globalScaling=0.2,
            physicsClientId=self.client,
        )

    def disconnect(self):
        if self.client is not None:
            try:
                p.disconnect(self.client)
            except Exception:
                pass
            self.client = None
