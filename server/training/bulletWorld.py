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
        return pos, rot

    def apply_actions(self, actions, entities):
        for agent_id, action in actions.items():
            print("Action Picked: ", action)
            agentData = entities[agent_id]
            process_action(
                agent_id, agentData, action, self.entity_mapping, self.client, entities
            )

    def spawn(self, entity):
        positionEntity = positionSwap(entity.position)
        rotationEntity = rotationSwap(entity.rotation, self.client)
        convertedRot = p.getQuaternionFromEuler(
            rotationEntity, physicsClientId=self.client
        )
        id = None
        if entity.tag == "agent":
            id = self.spawn_agent(positionEntity, convertedRot)
        elif entity.tag == "non_state":
            id = self.spawn_non_state(positionEntity, convertedRot)
        elif entity.tag == "target":
            id = self.spawn_target(positionEntity, convertedRot)
        elif entity.tag == "Pickable Object":
            id = self.spawn_holders(positionEntity, convertedRot)
        return id

    def step_simulation(self, steps=20):
        for _ in range(steps):
            p.stepSimulation(physicsClientId=self.client)

    def spawn_agent(self, pos, rot):
        return p.loadURDF(
            "r2d2.urdf", pos, rot, useFixedBase=False, physicsClientId=self.client
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
        return p.loadURDF(
            "cube.urdf", pos, rot, useFixedBase=True, physicsClientId=self.client
        )
