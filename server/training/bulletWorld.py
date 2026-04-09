import time

import pybullet as p
import pybullet_data

from server.engine.actuators.mainActuator import process_action
from server.utilities.positionSwap import positionSwap, rotationSwap


class PyBulletWorld:
    def __init__(self, scenario):
        self.client = None
        self.entity_mapping = {}

    def load(self):
        self.client = p.connect(p.GUI)
        p.setAdditionalSearchPath(pybullet_data.getDataPath())
        p.loadURDF("plane.urdf")

    def spawn_entities(self, entities_config):
        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

    def get_entity_state(self, entity_id):
        bullet_id = self.entity_mapping[entity_id]
        pos, rot = p.getBasePositionAndOrientation(bullet_id)
        return pos, rot

    def apply_actions(self, actions, entities):
        for agent_id, action in actions.items():
            print("Action Picked: ", action)
            agentData = entities[agent_id]
            process_action(agent_id, agentData, action, self.entity_mapping, entities)

    def spawn(self, entity):
        positionEntity = positionSwap(entity.position)
        rotationEntity = rotationSwap(entity.rotation)
        convertedRot = p.getQuaternionFromEuler(rotationEntity)
        id = None
        if entity.tag == "agent":
            id = self.spawn_agent(positionEntity, convertedRot)
        elif entity.tag == "non_state":
            id = self.spawn_non_state(positionEntity, convertedRot)
        elif entity.tag == "target":
            id = self.spawn_target(positionEntity, convertedRot)
        elif entity.tag == "Pickable Object":
            id = self.spawn_holders(positionEntity, convertedRot)
        else:
            pass
        return id

    def step_simulation(self, steps=100):
        for _ in range(steps):
            p.stepSimulation()
            time.sleep(1 / 240)

    @staticmethod
    def spawn_agent(pos, rot):
        agentSpawned = p.loadURDF("r2d2.urdf", pos, rot, useFixedBase=False)
        return agentSpawned

    @staticmethod
    def spawn_non_state(pos, rot):
        non_stateSpawned = p.loadURDF("cube.urdf", pos, rot, useFixedBase=True)
        return non_stateSpawned

    @staticmethod
    def spawn_target(pos, rot):
        targetSpawned = p.loadURDF("cube.urdf", pos, rot, useFixedBase=True)
        return targetSpawned

    @staticmethod
    def spawn_holders(pos, rot):
        holderSpawned = p.loadURDF("cube.urdf", pos, rot, useFixedBase=True)
        return holderSpawned
