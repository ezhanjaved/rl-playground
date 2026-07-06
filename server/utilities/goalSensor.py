import pybullet as p


class GoalSensor:
    def __init__(self, pos, rot, collider, goal_id, client, on_enter=None):
        self.goal_id = goal_id
        self.on_enter = on_enter
        self._inside_ids = set()
        self.client = client
        h = collider["h"]
        collision_shape = p.createCollisionShape(
            p.GEOM_BOX,
            halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
            physicsClientId=self.client,
        )
        px, py, _ = pos
        pos = (px, py, h / 2)
        self.goal_sensor_id = p.createMultiBody(
            baseMass=0,
            baseCollisionShapeIndex=collision_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

        p.setCollisionFilterGroupMask(
            self.goal_sensor_id, -1, 0, 0, physicsClientId=self.client
        )

    def get_goal_sensor(self):
        return self.goal_sensor_id

    def check(self, watched_body_id, entities, mapping):
        reverse_mapping = {v: k for k, v in mapping.items()}
        aabb_min, aabb_max = p.getAABB(self.goal_sensor_id, physicsClientId=self.client)
        overlapping = p.getOverlappingObjects(
            aabb_min, aabb_max, physicsClientId=self.client
        )
        overlapping_ids = {hit[0] for hit in overlapping} if overlapping else set()
        is_inside_now = watched_body_id in overlapping_ids
        was_inside = watched_body_id in self._inside_ids

        if is_inside_now and not was_inside:
            # Ball entered for first time
            self._inside_ids.add(watched_body_id)
            if self.on_enter:
                # This is the function I will use to update scores.
                self.on_enter(
                    self.goal_id,
                    watched_body_id,
                    entities,
                    reverse_mapping,
                    self.client,
                )
            # Ball has left now - release it from set
        elif not is_inside_now and was_inside:
            print("Ball has left now - release it from set")
            self._inside_ids.discard(watched_body_id)
