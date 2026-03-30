import pybullet as p


class PyBulletWorld:
    def __init__(self, scenario):
        self.client = None
        self.entity_mapping = {}

    def load(self):
        self.client = p.connect(p.DIRECT)

    def spawn_entities(self, entities_config):
        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

    def get_entity_state(self, entity_id):
        bullet_id = self.entity_mapping[entity_id]
        pos, rot = p.getBasePositionAndOrientation(bullet_id)
        return pos, rot

    def apply_actions(self, action):
        pass

    def spawn(self, entity):
        pass

    def step_simulation(self):
        pass
