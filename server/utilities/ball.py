import pybullet as p

from server.utilities.positionSwap import positionSwap


class Ball:
    def __init__(self, pos, rot, collider, mass, ball_id, client):
        self.client = client
        self.ball_id_entities = ball_id
        radius = collider.get("r", 0.3)

        collision_shape = p.createCollisionShape(
            p.GEOM_SPHERE, radius=radius, physicsClientId=self.client
        )

        visual_shape = p.createVisualShape(
            p.GEOM_SPHERE,
            radius=radius,
            rgbaColor=[1, 1, 1, 1],
            physicsClientId=self.client,
        )

        self.ball_id = p.createMultiBody(
            baseMass=mass,
            baseCollisionShapeIndex=collision_shape,
            baseVisualShapeIndex=visual_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

        p.changeDynamics(
            self.ball_id,
            -1,
            linearDamping=0.5,
            angularDamping=0.5,
            physicsClientId=self.client,
        )

    def get_ball_id(self):
        return self.ball_id

    # This function should check for collisions between ball and agents
    def collision_check(self, entities, mapping):
        reverse_mapping = {v: k for k, v in mapping.items()}
        contacts = p.getContactPoints(bodyA=self.ball_id, physicsClientId=self.client)
        for contact in contacts:
            other_body_id = contact[2]
            entity_id = reverse_mapping.get(other_body_id)
            if entity_id is None:
                continue

            status, entity = self.is_entity_agent(entity_id, entities)
            if status:
                ball_entity = entities[self.ball_id_entities]
                ball_entity_state = dict(ball_entity.state)
                ball_entity_state["lastTouchedBy"] = entity_id
                ball_entity_state["lastTouchedTeam"] = entity.teamId
                ball_entity.state = ball_entity_state

    def is_entity_agent(self, id, entities):
        entity = entities[id]
        if entity is None:
            return False, entity
        if entity.tag != "agent":
            return False, entity
        return True, entity
