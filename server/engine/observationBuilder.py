import math

import numpy as np

from server.utilities.distance3D import distance3D
from server.utilities.footballUtil import ball_to_goal, is_aligned_to_goal
from server.utilities.nearestTarget import getNearestTargetInfo
from server.utilities.obstaclePath import obstacleAvoid
from server.utilities.positionSwap import positionSwap

MAX_DIST = 40.0


def target_predicate(e):
    return getattr(e, "isTarget", False) in (True, "true", 1)


def pickable_predicate(e):
    return getattr(e, "isPickable", False) in (True, "true", 1)


def collect_predicate(e):
    return getattr(e, "isCollectable", False) in (True, "true", 1)


def obstacle_predicate(e):
    return getattr(e, "isDecor", False) in (True, "true", 1)


def deposit_predicate(e):
    return getattr(e, "isDeposit", False) in (True, "true", 1)


def destroyable_predicate(e):
    return getattr(e, "isDestroyable", False) in (True, "true", 1)


def gate_predicate(e):
    return getattr(e, "isGate", False) in (True, "true", 1)


def blue_goal_post_predicate(e):
    return getattr(e, "isGoalPostBlue", False) in (True, "true", 1)

def red_goal_post_predicate(e):
    return getattr(e, "isGoalPostRed", False) in (True, "true", 1)

def green_goal_post_predicate(e):
    return getattr(e, "isGoalPostGreen", False) in (True, "true", 1)

def yellow_goal_post_predicate(e):
    return getattr(e, "isGoalPostYellow", False) in (True, "true", 1)

def ball_predicate(e):
    return getattr(e, "isBall", False) in (True, "true", 1)


def partition_entities(entities):
    buckets = {
        "target": [],
        "pickable": [],
        "collectable": [],
        "obstacle": [],
        "deposit": [],
        "destroyable": [],
        "gate": [],
        "goalPostBlue": [],
        "goalPostRed": [],
        "goalPostYellow": [],
        "goalPostGreen": [],
        "ball": [],
    }
    for entity in entities.values():
        if not entity:
            continue
        if target_predicate(entity):
            buckets["target"].append(entity)
        if pickable_predicate(entity):
            buckets["pickable"].append(entity)
        if collect_predicate(entity):
            buckets["collectable"].append(entity)
        if obstacle_predicate(entity):
            buckets["obstacle"].append(entity)
        if deposit_predicate(entity):
            buckets["deposit"].append(entity)
        if destroyable_predicate(entity):
            buckets["destroyable"].append(entity)
        if gate_predicate(entity):
            buckets["gate"].append(entity)
        if blue_goal_post_predicate(entity):
            buckets["goalPostBlue"].append(entity)
        if red_goal_post_predicate(entity):
            buckets["goalPostRed"].append(entity)
        if green_goal_post_predicate(entity):
            buckets["goalPostGreen"].append(entity)
        if yellow_goal_post_predicate(entity):
            buckets["goalPostYellow"].append(entity)
        if ball_predicate(entity):
            buckets["ball"].append(entity)
    return buckets


def distance_in_direction(position, rotation, direction_angle_offset, bucket):
    theta = rotation[2] if rotation and len(rotation) > 2 else 0.0
    angle = theta + direction_angle_offset

    fx = math.sin(angle)
    fy = math.cos(angle)  # depth axis (PyBullet Y ↔ Three.js Z)

    cone_half_angle = math.pi / 4  # 45°
    max_range = 5.0
    min_dist = max_range

    for entity in bucket:
        target_pos = entity.position
        bullet_pos = positionSwap(target_pos)

        dx = -(
            bullet_pos[0] - position[0]
        )  # Added negative sign to match with Rapier convention
        dy = bullet_pos[1] - position[1]
        dist = math.sqrt(dx * dx + dy * dy)
        if dist > max_range or dist == 0.0:
            continue

        forward_dot = dx * fx + dy * fy
        if forward_dot <= 0:
            continue

        cone_angle = math.acos(min(forward_dot / dist, 1.0))
        if cone_angle <= cone_half_angle:
            min_dist = min(min_dist, dist)

    return min_dist / max_range  # normalised 0-1


def get_target_direction_obs(
    target_obj_pos,
    position,
    rotation,
):
    world_dx = (
        target_obj_pos[0] - position[0]
    )

    world_dz = (target_obj_pos[1] - position[1])
    theta = rotation[2] if len(rotation) > 2 else 0.0
    cos_t = math.cos(theta)
    sin_t = math.sin(theta)

    # Agent-local target position
    local_side =  sin_t * world_dz - cos_t * world_dx
    local_depth = cos_t * world_dz + sin_t * world_dx
    angle_to_target = math.atan2(local_side, local_depth)
    side_signal = math.sin(angle_to_target)
    depth_signal = math.cos(angle_to_target)

    return {
        "side_signal": side_signal,  # + left, - right
        "depth_signal": depth_signal,  # + forward, - behind
        "angle_to_target": angle_to_target,
        "local_side": local_side,
        "local_depth": local_depth,
        "world_dx": world_dx,
        "world_dz": world_dz,
    }


def nearestDistance(position, rotation, bucket, mode):
    # For delta modes, we first find the nearest entity by 3D distance,
    # then return its directional signal. This ensures "delta to nearest"
    # semantics rather than "most extreme delta across all entities".
    if mode in ("delta-x", "delta-z", "delta-x-fb", "delta-z-fb"):
        min_dist = float("inf")
        nearest_bullet_pos = None
        nearest_target_pos = None
        for entity in bucket:
            target_pos = entity.position
            bullet_pos = positionSwap(target_pos)
            d = distance3D(position, bullet_pos)
            if not math.isfinite(d):
                continue
            if d < min_dist:
                min_dist = d
                nearest_bullet_pos = bullet_pos
                nearest_target_pos = target_pos
        if nearest_bullet_pos is None:
            return 1.0, []
        obs = get_target_direction_obs(nearest_bullet_pos, position, rotation)
        match mode:
            case "delta-x":
                signal = obs["side_signal"]
            case "delta-z":
                signal = obs["depth_signal"]
            case "delta-x-fb":
                signal = max(-1.0, min(1.0, obs["local_side"] / MAX_DIST))
            case "delta-z-fb":
                signal = max(-1.0, min(1.0, obs["local_depth"] / MAX_DIST))
        return signal, nearest_target_pos

    min_dist = float("inf")
    min_pos = []
    found = False
    for entity in bucket:
        target_pos = entity.position  # Three.js space [x, z, y] // Euler [x,y,z]
        bullet_pos = positionSwap(
            target_pos
        )  # PyBullet space [-x, y, z] // Quanterion [x,z,y,w]
        if mode == "both":
            d = distance3D(position, bullet_pos)
        elif mode == "x":
            d = abs(position[0] - bullet_pos[0])
        elif mode == "y":
            # PyBullet Y = depth axis (Three.js Z)
            d = abs(position[1] - bullet_pos[1])
        else:
            continue

        # Guard against non-finite values, mirroring JS Number.isFinite() check
        if not math.isfinite(d):
            continue

        if d < min_dist:
            min_dist = d
            min_pos = target_pos
            found = True

    if not found:
        return 1.0, []

    return min(min_dist / MAX_DIST, 1.0), min_pos


class _DistCache:
    def __init__(self, position, rotation, buckets):
        self.position = position
        self.buckets = buckets
        self.rotation = rotation
        self._cache = {}

    def get(self, bucket_key, mode):
        key = (bucket_key, mode)
        if key not in self._cache:
            self._cache[key] = nearestDistance(
                self.position, self.rotation, self.buckets[bucket_key], mode
            )
        return self._cache[key]


def buildObs(agent_id, agentData, runTimeSnapShot, entity_buckets=None):

    obs_space = agentData.observation_space
    state_space = agentData.state_space
    position = agentData.position  # PyBullet space (x, y_depth, z_up)
    rotation = agentData.rotation  # PyBullet Euler angles
    if entity_buckets is None:
        entity_buckets = partition_entities(runTimeSnapShot)

    cache = _DistCache(position, rotation, entity_buckets)
    constructed_obs = []

    # --- This section is for Football Ability ---
    team_id = getattr(agentData, "teamId", None)
    opp_team_id = getattr(agentData, "oppTeamId", None)

    goal_bucket_key = None
    goal_bucket_key_our_own = None
    goal_flag = None

    match opp_team_id:
        case "blue":
            goal_bucket_key = "goalPostBlue"
            goal_flag = "blue-post"
        case "red":
            goal_bucket_key = "goalPostRed"
            goal_flag = "red-post"
        case "yellow":
            goal_bucket_key = "goalPostYellow"
            goal_flag = "yellow-post"
        case "green":
            goal_bucket_key = "goalPostGreen"
            goal_flag = "green-post"

    match team_id:
         case "blue":
             goal_bucket_key_our_own = "goalPostBlue"
         case "red":
             goal_bucket_key_our_own = "goalPostRed"
         case "yellow":
             goal_bucket_key_our_own = "goalPostYellow"
         case "green":
             goal_bucket_key_our_own = "goalPostGreen"

    # if team_id:
    #     goal_bucket_key = "goalPostRed" if team_id == "blue" else "goalPostBlue"
    #     goal_flag = "red-post" if team_id == "blue" else "blue-post"
    # if team_id:
    #     goal_buckey_key_our_own = "goalPostRed" if team_id == "red" else "goalPostBlue"

    for obs in obs_space:
        match obs:
            # --- (Moveable) ---
            case "agent_pos_x":
                constructed_obs.append(position[0] / MAX_DIST)

            case "agent_pos_z":
                constructed_obs.append(position[1] / MAX_DIST)

            case "agent_rotation_y":
                constructed_obs.append(rotation[2] / math.pi)

            # --- (TemporalMemory) ---
            case "last_action":
                idx = state_space.get("last_action_index", 0)
                total_actions = (
                    len(agentData.action_space) if agentData.action_space else 1
                )
                constructed_obs.append(idx / max(total_actions - 1, 1))

            case "last_action_counter":
                constructed_obs.append(
                    min(float(state_space.get("last_action_counter", 0)) / 10.0, 1.0)
                )

            # --- (Navigator) ---
            case "obstacle_forward":
                constructed_obs.append(
                    distance_in_direction(
                        position, rotation, 0, entity_buckets["obstacle"]
                    )
                )

            case "obstacle_left":
                constructed_obs.append(
                    distance_in_direction(
                        position, rotation, math.pi / 2, entity_buckets["obstacle"]
                    )
                )

            case "obstacle_right":
                constructed_obs.append(
                    distance_in_direction(
                        position, rotation, -math.pi / 2, entity_buckets["obstacle"]
                    )
                )

            case "obstacle_in_path":
                dist, min_pos = cache.get("obstacle", "both")
                if dist >= 1.0:
                    constructed_obs.append(0.0)
                else:
                    obs_in_path = obstacleAvoid(position, rotation, min_pos)
                    constructed_obs.append(float(obs_in_path))

            # --- (Finder) ---
            case "delta_x_to_target":
                dist, _ = cache.get("target", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_target":
                dist, _ = cache.get("target", "delta-z")
                constructed_obs.append(dist)

            case "dist_to_nearest_target":
                dist, _ = cache.get("target", "both")
                constructed_obs.append(dist)

            case "in_target_radius":
                dist, _ = cache.get("target", "both")
                target_bucket = entity_buckets["target"]
                if target_bucket:
                    found, best, radius, _ = getNearestTargetInfo(
                        position, runTimeSnapShot, "target"
                    )
                    constructed_obs.append(1.0 if (found and best <= radius) else 0.0)
                else:
                    constructed_obs.append(0.0)

            # --- (Holder) ---
            case "delta_x_to_pickable":
                dist, _ = cache.get("pickable", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_pickable":
                dist, _ = cache.get("pickable", "delta-z")
                constructed_obs.append(dist)

            case "dist_to_nearest_pickable":
                dist, _ = cache.get("pickable", "both")
                constructed_obs.append(dist)

            case "holding":
                constructed_obs.append(1.0 if state_space.get("holding") else 0.0)

            case "in_radius_holder":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "Pickable Object"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "lastPickSuccess":
                lps = state_space.get("lastPickSuccess")
                if lps is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lps else 0.0)

            # --- (Collector) ---
            case "dist_to_nearest_collectable":
                dist, _ = cache.get("collectable", "both")
                constructed_obs.append(dist)

            case "delta_x_to_collectable":
                dist, _ = cache.get("collectable", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_collectable":
                dist, _ = cache.get("collectable", "delta-z")
                constructed_obs.append(dist)

            case "items_collected":
                constructed_obs.append(
                    min(float(state_space.get("items_collected", 0)) / 10.0, 1.0)
                )

            case "keys_collected":
                val = float(state_space.get("keys_collected", 0))
                val = min(val / 10.0, 1.0)
                constructed_obs.append(val)

            case "total_items_collected":
                constructed_obs.append(
                    min(float(state_space.get("total_items_collected", 0)) / 10.0, 1.0)
                )

            case "in_radius_collect":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "Collectible Object"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            # --- (Depositor) ---
            case "dist_to_nearest_deposit":
                dist, _ = cache.get("deposit", "both")
                constructed_obs.append(dist)

            case "delta_x_to_deposit":
                dist, _ = cache.get("deposit", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_deposit":
                dist, _ = cache.get("deposit", "delta-z")
                constructed_obs.append(dist)

            case "items_deposited":
                constructed_obs.append(
                    min(float(state_space.get("items_deposited", 0)) / 10.0, 1.0)
                )

            case "in_radius_deposit":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "deposit"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "last_deposit_success":
                lds = state_space.get("lastDepositSuccess")
                if lds is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lds else 0.0)

            # --- (Destroyer) ---
            case "dist_to_nearest_destroyable":
                dist, _ = cache.get("destroyable", "both")
                constructed_obs.append(dist)

            case "delta_x_to_destroyable":
                dist, _ = cache.get("destroyable", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_destroyable":
                dist, _ = cache.get("destroyable", "delta-z")
                constructed_obs.append(dist)

            case "items_destroyed":
                constructed_obs.append(
                    min(float(state_space.get("items_destroyed", 0)) / 10.0, 1.0)
                )

            case "in_radius_destroyed":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "destroyable"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "last_destroy_success":
                lds = state_space.get("lastDestroySuccess")
                if lds is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lds else 0.0)

            # --- (Opener) ---
            case "dist_to_nearest_gate":
                dist, _ = cache.get("gate", "both")
                constructed_obs.append(dist)

            case "delta_x_to_gate":
                dist, _ = cache.get("gate", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_gate":
                dist, _ = cache.get("gate", "delta-z")
                constructed_obs.append(dist)

            case "in_radius_gate":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "gate"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "gates_open":
                constructed_obs.append(
                    min(float(state_space.get("gates_open", 0)) / 10.0, 1.0)
                )

            case "hasKey":
                constructed_obs.append(
                    1.0 if state_space.get("keys_collected", 0) > 0 else 0.0
                )

            case "last_open_success":
                los = state_space.get("lastOpenSuccess")
                if los is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if los else 0.0)

            # --- (Footballer) ---
            case "dist_to_nearest_ball":
                dist, _ = cache.get("ball", "both")
                constructed_obs.append(dist)

            case "delta_x_to_ball":
                dist, _ = cache.get("ball", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_ball":
                dist, _ = cache.get("ball", "delta-z")
                constructed_obs.append(dist)

            case "in_radius_ball":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, "ball"
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "dist_to_target_goal":
                dist, _ = cache.get(goal_bucket_key, "both")
                constructed_obs.append(dist)

            case "delta_x_to_goal":
                dist, _ = cache.get(goal_bucket_key, "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_goal":
                dist, _ = cache.get(goal_bucket_key, "delta-z")
                constructed_obs.append(dist)

            case "in_radius_goal":
                found, best, radius, _ = getNearestTargetInfo(
                    position, runTimeSnapShot, goal_flag
                )
                constructed_obs.append(1.0 if (found and best <= radius) else 0.0)

            case "alignment_to_goal":
                deltaX, _ = cache.get(goal_bucket_key, "delta-x")
                deltaY, _ = cache.get(goal_bucket_key, "delta-z")
                is_aligned = is_aligned_to_goal(deltaX, deltaY)
                constructed_obs.append(1.0 if is_aligned else 0.0)


            case "ball_dist_to_enemy_goal":
                deltaXb, _ = cache.get("ball", "delta-x-fb")
                deltaYb, _ = cache.get("ball", "delta-z-fb")
                deltaXp, _ = cache.get(goal_bucket_key, "delta-x-fb")
                deltaYp, _ = cache.get(goal_bucket_key, "delta-z-fb")
                distance = ball_to_goal(
                    deltaXb, deltaYb, deltaXp, deltaYp
                    )
                constructed_obs.append(distance)

            case "ball_dist_to_own_goal":
                deltaXb, _ = cache.get("ball", "delta-x-fb")
                deltaYb, _ = cache.get("ball", "delta-z-fb")
                deltaXp, _ = cache.get(goal_bucket_key_our_own, "delta-x-fb")
                deltaYp, _ = cache.get(goal_bucket_key_our_own, "delta-z-fb")
                distance = ball_to_goal(
                    deltaXb, deltaYb, deltaXp, deltaYp
                )
                constructed_obs.append(distance)

            case "ball_in_own_goal_danger_zone":
                deltaXb, _ = cache.get("ball", "delta-x-fb")
                deltaYb, _ = cache.get("ball", "delta-z-fb")
                deltaXp, _ = cache.get(goal_bucket_key_our_own, "delta-x-fb")
                deltaYp, _ = cache.get(goal_bucket_key_our_own, "delta-z-fb")
                distance = ball_to_goal(
                    deltaXb, deltaYb, deltaXp, deltaYp
                )
                is_danger = distance < 0.08
                constructed_obs.append(1.0 if is_danger else 0.0)

            case "last_kick_success":
                lks = state_space.get("lastKickSuccess")
                if lks is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lks else 0.0)

            case "my_goals_scored":
                constructed_obs.append(
                    min(float(state_space.get("my_goals_scored", 0)) / 10.0, 1.0)
                )

            case "my_own_goals_scored":
                constructed_obs.append(
                    min(float(state_space.get("my_own_goals_scored", 0)) / 10.0, 1.0)
                )

            case "team_goals_scored":
                constructed_obs.append(
                    min(float(state_space.get("team_goals_scored", 0)) / 10.0, 1.0)
                )

            case "team_goals_conceded":
                constructed_obs.append(
                    min(float(state_space.get("team_goals_conceded", 0)) / 10.0, 1.0)
                )

            case "last_goal_type":
                # None/missing = none (0.5), True = normal_goal (1), False = own_goal (0)
                lgt = state_space.get("last_goal_type")
                if lgt is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lgt else 0.0)

            case _:
                constructed_obs.append(0.0)

    obs_array = np.array(constructed_obs, dtype=np.float32)
    obs_array = np.nan_to_num(obs_array, nan=0.0, posinf=1.0, neginf=-1.0)
    return obs_array
