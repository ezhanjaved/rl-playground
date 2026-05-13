import math

import numpy as np

from server.utilities.distance3D import distance3D
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


def partition_entities(entities):
    buckets = {
        "target": [],
        "pickable": [],
        "collectable": [],
        "obstacle": [],
        "deposit": [],
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


def nearestDistance(position, rotation, bucket, mode):
    min_dist = float("inf")
    min_pos = []
    found = False

    for entity in bucket:
        target_pos = entity.position  # Three.js space [x, z, y] // Euler [x,y,z]
        bullet_pos = positionSwap(
            target_pos
        )  # PyBullet space [x, y, z] // Quanterion [x,y,z,w]

        if mode == "both":
            d = distance3D(position, bullet_pos)
        elif mode == "x":
            # Both converted to PyBullet space for consistency
            d = abs(position[0] - bullet_pos[0])
        elif mode == "y":
            # PyBullet Y = depth axis (Three.js Z)
            d = abs(position[1] - bullet_pos[1])
        elif mode == "delta-x":
            dx = -(
                bullet_pos[0] - position[0]
            )  # Added negative sign to match with Rapier convention
            dy = bullet_pos[1] - position[1]
            theta = rotation[2]
            d = math.cos(theta) * dx + math.sin(theta) * dy
        elif mode == "delta-z":
            dx = bullet_pos[0] - position[0]
            dy = bullet_pos[1] - position[1]
            theta = rotation[2]
            d = -math.sin(theta) * dx + math.cos(theta) * dy
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

    for obs in obs_space:
        match obs:
            # --- (Moveable) ---
            case "agent_pos_x":
                constructed_obs.append(position[0] / MAX_DIST)

            case "agent_pos_z":
                constructed_obs.append(position[1] / MAX_DIST)

            case "agent_rotation_y":
                constructed_obs.append(rotation[2] / math.pi)

            case "last_action":
                idx = state_space.get("last_action_index", 0)
                total_actions = (
                    len(agentData.action_space) if agentData.action_space else 1
                )
                constructed_obs.append(idx / max(total_actions - 1, 1))

            # --- (Navigator) ---
            case "delta_x_to_obstacle":
                dist, _ = cache.get("obstacle", "delta-x")
                constructed_obs.append(dist)

            case "delta_z_to_obstacle":
                dist, _ = cache.get("obstacle", "delta-z")
                constructed_obs.append(dist)

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
                    found, best, radius = getNearestTargetInfo(
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

            case "items_deposit":
                constructed_obs.append(
                    min(float(state_space.get("items_deposited", 0)) / 10.0, 1.0)
                )

            case "last_deposit_success":
                lds = state_space.get("lastDepositSuccess")
                if lds is None:
                    constructed_obs.append(0.5)
                else:
                    constructed_obs.append(1.0 if lds else 0.0)

            case _:
                constructed_obs.append(0.0)

    obs_array = np.array(constructed_obs, dtype=np.float32)
    obs_array = np.nan_to_num(obs_array, nan=0.0, posinf=1.0, neginf=-1.0)
    return obs_array
