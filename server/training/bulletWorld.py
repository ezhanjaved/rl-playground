import math
import random

# import time
import pybullet as p
import pybullet_data

from server.engine.actuators.mainActuator import process_action
from server.utilities.ball import Ball
from server.utilities.distance3D import distance3D
from server.utilities.footballref import footballRef
from server.utilities.goalSensor import GoalSensor
from server.utilities.positionSwap import positionSwap, rotationSwap


class PyBulletWorld:
    def __init__(self):
        self.client = None
        self.entity_mapping = {}
        self.ball_id = None
        self.ball_obj = None

        self.red_goal_post = None
        self.blue_goal_post = None
        self.yellow_goal_post = None
        self.green_goal_post = None

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

    def spawn_entities(
        self,
        entities_config,
        highestDistance,
        spawn_mode,
        topographyFixed,
        randomizerMode,
        jitter_radius,
        obstacleMode
    ):
        # IMPORTANT: must use shallow list — randomize_entities_open_space mutates
        # entity.position in-place on the original objects so that runtime.entities
        # stays in sync. deepcopy here would break OBS for all non-agent entities.
        entities_config = list(entities_config)

        if spawn_mode == "Random":
            self.grid = None
            self.min_x, self.min_y = -10.0, -10.0
            self.max_x, self.max_y = 10.0, 10.0
            # This is a flag that will come from client side which user will have to use to
            # let system know if what env they have designed they want to preserve its topography
            # if yes then system will ensure that obstacles are not randomized and we use grid to properly place
            # objects within it.
            # if not then system will randomize everything without any rule/regulation - just using highestDist to maintain chain
            self.non_state_ent_configs = None
            self.excluded_ent_configs = None
            self.merged = []
            self.temp_ent_config = None
            if topographyFixed:
                self.cell_size = 0.2
                excluded_tags = ("non_state", "red-post", "blue-post", "yellow-post", "green-post")
                self.non_state_ent_configs = [
                    ent for ent in entities_config if ent.tag in excluded_tags
                ]
                self.define_grid_bounds(self.non_state_ent_configs)
                self.grid = self.create_a_grid(self.non_state_ent_configs)
                self.visualize_grid(
                    self.grid
                )  # debug only — remove or gate before shipping
                self.excluded_ent_configs = [
                    ent for ent in entities_config if ent.tag not in excluded_tags
                ]
                self.temp_ent_config = self.randomize_entities(
                    self.excluded_ent_configs,
                    highestDistance,
                    self.grid,
                    randomizerMode,
                    jitter_radius,
                    obstacleMode
                )
                self.merged = self.temp_ent_config + self.non_state_ent_configs
            else:
                entities_config = self.randomize_entities(
                    entities_config,
                    highestDistance,
                    self.grid,
                    randomizerMode,
                    jitter_radius,
                    obstacleMode
                )
                self.merged = entities_config
            entities_config = self.merged
        for entity in entities_config:
            bullet_id = self.spawn(entity)
            self.entity_mapping[entity.id] = bullet_id

    def utility_for_grid_making(self, ent):
        half_w, half_d, r = 0.0, 0.0, 0.0
        pos = ent.position
        postSwapPos = positionSwap(pos)
        wx, wy, _ = postSwapPos

        collider = ent.collider
        shape = collider.get("shape", "box")
        if shape == "box":
            w = collider["w"]
            half_w = w / 2
            d = collider["d"]
            half_d = d / 2
        elif shape == "capsule":
            r = collider["r"]

        preSwapRot = ent.quatRotation
        postSwapRot = rotationSwap(preSwapRot)
        _, _, rz, rw = postSwapRot
        yaw = 2 * math.atan2(rz, rw)

        return wx, wy, half_w, half_d, r, yaw, shape

    def get_entity_effective_half_extents(self, entity):
        if entity.tag == "generic":
            return 0.0, 0.0
        collider = entity.collider
        shape = collider.get("shape", "capsule")

        if shape == "capsule":
            r = collider.get("r", 0.3)
            return r, r

        if shape == "box":
            preSwapRot = entity.quatRotation
            postSwapRot = rotationSwap(preSwapRot)
            _, _, rz, rw = postSwapRot
            yaw = 2 * math.atan2(rz, rw)

            half_w = collider["w"] / 2
            half_d = collider["d"] / 2

            half_x = abs(half_w * math.cos(yaw)) + abs(half_d * math.sin(yaw))
            half_y = abs(half_w * math.sin(yaw)) + abs(half_d * math.cos(yaw))
            return half_x, half_y

        return 0.0, 0.0

    def visualize_grid(self, grid, show_free=False, persist=False):
        if not persist:
            if hasattr(self, "_grid_debug_ids") and self._grid_debug_ids:
                for debug_id in self._grid_debug_ids:
                    p.removeUserDebugItem(debug_id, physicsClientId=self.client)
            self._grid_debug_ids = []

        cols = len(grid)
        rows = len(grid[0]) if cols > 0 else 0

        blocked_points, blocked_colors = [], []
        free_points, free_colors = [], []

        for col in range(cols):
            for row in range(rows):
                wx = self.min_x + (col + 0.5) * self.cell_size
                wy = self.min_y + (row + 0.5) * self.cell_size
                point = [wx, wy, 0.05]

                if grid[col][row]:
                    blocked_points.append(point)
                    blocked_colors.append([1, 0, 0])  # red = blocked
                elif show_free:
                    free_points.append(point)
                    free_colors.append([0, 1, 0])  # green = free

        if blocked_points:
            debug_id = p.addUserDebugPoints(
                blocked_points,
                blocked_colors,
                pointSize=6,
                physicsClientId=self.client,
            )
            if not persist:
                self._grid_debug_ids.append(debug_id)

        if free_points:
            debug_id = p.addUserDebugPoints(
                free_points,
                free_colors,
                pointSize=6,  # smaller, so they don't visually drown out blocked cells
                physicsClientId=self.client,
            )
            if not persist:
                self._grid_debug_ids.append(debug_id)

    def define_grid_bounds(self, entitiesConfig):
        min_x, min_y = float("inf"), float("inf")
        max_x, max_y = float("-inf"), float("-inf")
        for ent in entitiesConfig:
            wx, wy, half_w, half_d, r, yaw, shape = self.utility_for_grid_making(ent)

            if shape == "box":
                effective_half_w = abs(half_w * math.cos(yaw)) + abs(
                    half_d * math.sin(yaw)
                )
                effective_half_d = abs(half_w * math.sin(yaw)) + abs(
                    half_d * math.cos(yaw)
                )

                left_edge = wx - effective_half_w
                right_edge = wx + effective_half_w

                min_x = min(min_x, left_edge)
                max_x = max(max_x, right_edge)

                bottom_edge = wy - effective_half_d
                top_edge = wy + effective_half_d

                min_y = min(min_y, bottom_edge)
                max_y = max(max_y, top_edge)

            if shape == "capsule":
                left_edge = wx - r
                right_edge = wx + r
                min_x = min(min_x, left_edge)
                max_x = max(max_x, right_edge)

                bottom_edge = wy - r
                top_edge = wy + r
                min_y = min(min_y, bottom_edge)
                max_y = max(max_y, top_edge)

        if max_x != float("-inf") and max_y != float("-inf"):
            self.max_x = max_x
            self.max_y = max_y

        if min_x != float("inf") and min_y != float("inf"):
            self.min_x = min_x
            self.min_y = min_y
        return

    # grid[col][row]
    def create_a_grid(
        self, entitiesConfig
    ):  # entitiesConfig would only include (obstacles + posts)
        cols = int((self.max_x - self.min_x) / self.cell_size)  # 40.0 / 0.2 = 200
        rows = int((self.max_y - self.min_y) / self.cell_size)  # 40.0 / 0.2 = 200
        grid = [[False for _ in range(rows)] for _ in range(cols)]
        for col in range(cols):
            for row in range(rows):
                for entity in entitiesConfig:
                    sx = self.min_x + (col + 0.5) * self.cell_size
                    sy = self.min_y + (row + 0.5) * self.cell_size
                    wx, wy, half_w, half_d, r, yaw, shape = (
                        self.utility_for_grid_making(entity)
                    )
                    if shape == "box":
                        dx = sx - wx
                        dy = sy - wy
                        local_x = dx * math.cos(-yaw) - dy * math.sin(-yaw)
                        local_y = dx * math.sin(-yaw) + dy * math.cos(-yaw)

                        if -half_w < local_x < half_w and -half_d < local_y < half_d:
                            grid[col][row] = True

                    if shape == "capsule":
                        distance_to_capsule_center = math.sqrt(
                            (sx - wx) ** 2 + (sy - wy) ** 2
                        )
                        if distance_to_capsule_center < r:
                            grid[col][row] = True
        return grid

    def dilate_grid(self, grid, radius_cells):
        if radius_cells <= 0:
            return [row[:] for row in grid]
        cols = len(grid)
        rows = len(grid[0]) if cols > 0 else 0
        dilated = [[False for _ in range(rows)] for _ in range(cols)]
        for col in range(cols):
            for row in range(rows):
                for dc in range(-radius_cells, radius_cells + 1):
                    for dr in range(-radius_cells, radius_cells + 1):
                        nc, nr = col + dc, row + dr
                        if 0 <= nc < cols and 0 <= nr < rows:
                            if grid[nc][nr] and dc * dc + dr * dr <= radius_cells * radius_cells:
                                dilated[col][row] = True
                                break
                    if dilated[col][row]:
                        break
        return dilated

    def _dilated_grid_for(self, grid, effective_radius):
        if grid is None or effective_radius <= 0:
            return grid
        radius_cells = max(1, int(math.ceil(effective_radius / self.cell_size)))
        return self.dilate_grid(grid, radius_cells)

    def randomize_entities(
        self,
        entConfigCopy,
        highestDistance,
        grid,
        randomizerMode,
        jitter_radius,
        obstacleMode
    ):

        TAG_PRIORITY = {
            "agent": 0,
            "non_state": 1,
            "ball": 1,
            "red-post": 2,
            "blue-post": 2,
            "yellow-post": 2,
            "green-post": 2,
            "Pickable Object": 3,
            "Collectible Object": 4,
            "deposit": 5,
            "destroyable": 6,
            "gate": 7,
            "target": 8,
        }

        entConfigCopy = sorted(entConfigCopy, key=lambda e: TAG_PRIORITY.get(e.tag, 99))

        if randomizerMode == "Full Randomization":
            print("FR")
            agentConfig = next((e for e in entConfigCopy if e.tag == "agent"), None)
            if agentConfig is None:
                return entConfigCopy

            agent_mx, agent_my = self.get_entity_effective_half_extents(agentConfig)
            agent_grid = self._dilated_grid_for(grid, max(agent_mx, agent_my))

            agentRandomPos = self.random_position_around(
                agentConfig.position,
                min_dist=2.0,
                max_dist=highestDistance,
                grid=agent_grid,
                margin_x=agent_mx,
                margin_y=agent_my,
            )
            if agentRandomPos is None:
                return entConfigCopy
            agentConfig.position = agentRandomPos
            agentId = agentConfig.id
            lastPos = agentRandomPos
            obstacleObjs = []
            targetObj = []
            for obj in entConfigCopy:
                if obj.id == agentId:
                    continue
                if obstacleMode and obj.tag == "non_state":
                    obstacleObjs.append(obj)
                    continue

                obj_mx, obj_my = self.get_entity_effective_half_extents(obj)
                obj_grid = self._dilated_grid_for(grid, max(obj_mx, obj_my))

                success = False
                for _ in range(100):
                    objRandomPos = self.random_position_around(
                        lastPos,
                        min_dist=2.0,
                        max_dist=highestDistance * 0.75,
                        grid=obj_grid,
                        margin_x=obj_mx,
                        margin_y=obj_my,
                    )
                    if objRandomPos:
                        obj.position = objRandomPos
                        lastPos = objRandomPos
                        targetObj = objRandomPos
                        success = True
                        break

                if not success:
                    print(f"Failed to randomize {obj.id}")

            if len(obstacleObjs) != 0:
                for obstacle in obstacleObjs:
                    result = self.randomize_obstacle_between(agentRandomPos, targetObj, obstacle.collider)
                    if result is not None:
                        position, yaw = result
                        # apply obstacle_yaw to obstacle.quatRotation here
                        obstacle.position = position
                        obstacle.quatRotation = yaw
                    else:
                        print(f"Failed to place obstacle {obstacle.id}")

        else:
            for obj in entConfigCopy:
                obj_mx, obj_my = self.get_entity_effective_half_extents(obj)
                obj_grid = self._dilated_grid_for(grid, max(obj_mx, obj_my))

                new_pos = self.random_position_jitter(
                    center=obj.position,
                    jitter_radius=jitter_radius,
                    grid=obj_grid,
                    margin_x=obj_mx,
                    margin_y=obj_my,
                )

                if new_pos is not None:
                    obj.position = new_pos
                else:
                    print(f"Failed to jitter {obj.id}")

        return entConfigCopy

    def randomize_obstacle_between(
        self,
        agent_pos,
        target_pos,
        obstacle_collider,
        grid=None,
        t_range=(0.3, 0.7),
        lateral_jitter=0.8,
        max_attempts=100,
    ):
        agent_b = positionSwap(agent_pos)
        target_b = positionSwap(target_pos)
        ax, ay, az = agent_b
        tx, ty, tz = target_b

        dx, dy = tx - ax, ty - ay
        path_len = math.hypot(dx, dy)
        if path_len < 1e-3:
            return None  # agent and target basically coincide, nothing to block

        ux, uy = dx / path_len, dy / path_len   # unit vector along path
        px, py = -uy, ux                         # perpendicular unit vector

        # half-extent along the path axis, used to keep clearance from endpoints
        half_w = obstacle_collider.get("w", 1.0) / 2

        for _ in range(max_attempts):
            t = random.uniform(*t_range)
            lateral = random.uniform(-lateral_jitter, lateral_jitter)

            ox = ax + ux * path_len * t + px * lateral
            oy = ay + uy * path_len * t + py * lateral

            ox = max(self.min_x, min(self.max_x, ox))
            oy = max(self.min_y, min(self.max_y, oy))

            if grid is not None:
                col = int((ox - self.min_x) / self.cell_size)
                row = int((oy - self.min_y) / self.cell_size)
                col = max(0, min(len(grid) - 1, col))
                row = max(0, min(len(grid[0]) - 1, row))
                if grid[col][row]:
                    continue

            # orient obstacle so its face is roughly perpendicular to the path
            # (blocks straight-line travel rather than lying parallel to it)
            yaw = math.atan2(uy, ux) + math.pi / 2
            quat = self.yaw_to_threejs_quat(yaw)
            return positionSwap([ox, oy, az]), quat

        return None

    def yaw_to_bullet_quat(self, yaw):
        half = yaw / 2.0
        return (0.0, 0.0, math.sin(half), math.cos(half))

    def yaw_to_threejs_quat(self, yaw):
        bullet_quat = self.yaw_to_bullet_quat(yaw)
        return rotationSwap(bullet_quat)

    def random_position_around(self, center, min_dist, max_dist, grid, margin_x=0, margin_y=0):
        center_bullet = positionSwap(center)
        cx, cy, cz = center_bullet
        for _ in range(100):
            x = random.uniform(cx - max_dist, cx + max_dist)
            y = random.uniform(cy - max_dist, cy + max_dist)

            x = max(self.min_x + margin_x, min(self.max_x - margin_x, x))
            y = max(self.min_y + margin_y, min(self.max_y - margin_y, y))

            dist = distance3D(center_bullet, [x, y, cz])

            if min_dist < dist < max_dist:
                if grid is None:
                    return positionSwap([x, y, cz])
                col = int((x - self.min_x) / self.cell_size)
                row = int((y - self.min_y) / self.cell_size)
                col = max(0, min(len(grid) - 1, col))
                row = max(0, min(len(grid[0]) - 1, row))
                if not grid[col][row]:
                    return positionSwap([x, y, cz])
        return None

    def random_position_jitter(self, center, jitter_radius, grid=None, margin_x=0, margin_y=0):
        center_bullet = positionSwap(center)
        cx, cy, cz = center_bullet

        for _ in range(100):
            angle = random.uniform(0, 2 * math.pi)
            radius = jitter_radius * math.sqrt(random.random())

            x = cx + radius * math.cos(angle)
            y = cy + radius * math.sin(angle)

            if x < self.min_x + margin_x or x > self.max_x - margin_x:
                continue
            if y < self.min_y + margin_y or y > self.max_y - margin_y:
                continue

            if grid is not None:
                col = int((x - self.min_x) / self.cell_size)
                row = int((y - self.min_y) / self.cell_size)

                col = max(0, min(len(grid) - 1, col))
                row = max(0, min(len(grid[0]) - 1, row))

                if grid[col][row]:
                    continue

            return positionSwap([x, y, cz])

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
        elif entity.tag == "non_state" or entity.tag == "gate":
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
        elif entity.tag == "destroyable":
            bullet_id = self.spawn_destroyable(
                positionEntity, rotationEntity, colliderEntity
            )
        elif entity.tag == "ball":
            self.ball_obj = Ball(
                positionEntity,
                rotationEntity,
                colliderEntity,
                1.0,
                entity.id,
                self.client,
            )
            self.ball_id = self.ball_obj.get_ball_id()
            bullet_id = self.ball_obj.get_ball_id()
        elif entity.tag == "push-obj":
            bullet_id = self.push_objs(
                positionEntity, rotationEntity, 1.0, colliderEntity
            )
        elif entity.tag == "red-post":
            self.red_goal_post = GoalSensor(
                positionEntity,
                rotationEntity,
                colliderEntity,
                "red",
                self.client,
                footballRef,
            )
            bullet_id = self.red_goal_post.get_goal_sensor()
        elif entity.tag == "blue-post":
            self.blue_goal_post = GoalSensor(
                positionEntity,
                rotationEntity,
                colliderEntity,
                "blue",
                self.client,
                footballRef,
            )
            bullet_id = self.blue_goal_post.get_goal_sensor()
        elif entity.tag == "yellow-post":
            self.yellow_goal_post = GoalSensor(
                positionEntity,
                rotationEntity,
                colliderEntity,
                "yellow",
                self.client,
                footballRef,
            )
            bullet_id = self.yellow_goal_post.get_goal_sensor()
        elif entity.tag == "green-post":
            self.green_goal_post = GoalSensor(
                positionEntity,
                rotationEntity,
                colliderEntity,
                "green",
                self.client,
                footballRef,
            )
            bullet_id = self.green_goal_post.get_goal_sensor()
        elif entity.tag == "generic" or entity.tag == "":
            pass
        else:
            raise ValueError(
                f"spawn() received unknown entity tag '{entity.tag}' "
                f"(id={entity.id}). Add a spawn branch for this tag."
            )

        return bullet_id

    def check_post(self, entities):
        if self.ball_id is None:
            return
        if self.blue_goal_post is not None:
            self.blue_goal_post.check(self.ball_id, entities, self.entity_mapping)
        if self.red_goal_post is not None:
            self.red_goal_post.check(self.ball_id, entities, self.entity_mapping)
        if self.green_goal_post is not None:
            self.green_goal_post.check(self.ball_id, entities, self.entity_mapping)
        if self.yellow_goal_post is not None:
            self.yellow_goal_post.check(self.ball_id, entities, self.entity_mapping)

    def collision_check_ball_agent(self, entities):
        if self.ball_id is None:
            return
        self.ball_obj.collision_check(entities, self.entity_mapping)

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

    def push_objs(self, pos, rot, mass, collider):
        shape = collider.get("shape", "capsule")
        if shape == "box":
            h = collider["h"]
            collision_shape = p.createCollisionShape(
                p.GEOM_BOX,
                halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
                physicsClientId=self.client,
            )
            visual_shape = p.createVisualShape(
                p.GEOM_BOX,
                halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
                physicsClientId=self.client,
            )
            px, py, _ = pos
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
            visual_shape = p.createVisualShape(
                p.GEOM_CAPSULE,
                radius=r,
                height=cylinder_height,
                physicsClientId=self.client,
            )
            px, py, _ = pos
            pos = (px, py, h / 2)

        push_obj_id = p.createMultiBody(
            baseMass=mass,
            baseCollisionShapeIndex=collision_shape,
            baseVisualShapeIndex=visual_shape,
            basePosition=pos,
            baseOrientation=rot,
            physicsClientId=self.client,
        )

        p.changeDynamics(
            push_obj_id,
            -1,
            linearDamping=0.5,
            angularDamping=0.5,
            physicsClientId=self.client,
        )

        return push_obj_id

    def spawn_destroyable(self, pos, rot, collider):
        h = collider["h"]
        collision_shape = p.createCollisionShape(
            p.GEOM_BOX,
            halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
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

    def spawn_non_state(self, pos, rot, collider):
        shape = collider.get("shape", "capsule")
        if shape == "box":
            h = collider["h"]
            collision_shape = p.createCollisionShape(
                p.GEOM_BOX,
                halfExtents=[collider["w"] / 2, collider["d"] / 2, h / 2],
                physicsClientId=self.client,
            )
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
