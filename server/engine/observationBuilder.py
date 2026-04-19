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


def nearestDistance(position, bucket, mode):

    min_dist = float("inf")
    min_pos = []
    found = False

    for entity in bucket:
        target_pos = entity.position  # Three.js space
        bullet_pos = positionSwap(target_pos)  # PyBullet space

        if mode == "both":
            d = distance3D(position, bullet_pos)
        elif mode == "x":
            # Both converted to PyBullet space for consistency
            d = abs(position[0] - bullet_pos[0])
        elif mode == "y":
            # PyBullet Y = depth axis (Three.js Z)
            d = abs(position[1] - bullet_pos[1])
        else:
            # FIX: unknown mode — skip rather than leaving d unbound
            continue

        if d < min_dist:
            min_dist = d
            min_pos = target_pos
            found = True

    if not found:
        return 1.0, []

    return min(min_dist / MAX_DIST, 1.0), min_pos


class _DistCache:
    def __init__(self, position, buckets):
        self.position = position
        self.buckets = buckets
        self._cache = {}

    def get(self, bucket_key, mode):
        key = (bucket_key, mode)
        if key not in self._cache:
            self._cache[key] = nearestDistance(
                self.position, self.buckets[bucket_key], mode
            )
        return self._cache[key]


def buildObs(agent_id, agentData, runTimeSnapShot, entity_buckets=None):

    obs_space = agentData.observation_space
    state_space = agentData.state_space
    position = agentData.position  # PyBullet space (x, y_depth, z_up)
    rotation = agentData.rotation  # PyBullet Euler angles

    if entity_buckets is None:
        entity_buckets = partition_entities(runTimeSnapShot)

    cache = _DistCache(position, entity_buckets)
    constructed_obs = []

    for obs in obs_space:
        match obs:
            # --- Agent self-awareness (Moveable) ---
            case "agent_pos_x":
                constructed_obs.append(position[0] / MAX_DIST)

            case "agent_pos_z":
                # Three.js Z = PyBullet Y (depth axis)
                constructed_obs.append(position[1] / MAX_DIST)

            case "agent_rotation_y":
                constructed_obs.append(rotation[2] / math.pi)

            # --- Obstacle observations (Navigator) ---
            case "dist_x_to_obstacle":
                dist, _ = cache.get("obstacle", "x")
                constructed_obs.append(dist)

            case "dist_z_to_obstacle":
                dist, _ = cache.get("obstacle", "y")
                constructed_obs.append(dist)

            case "dist_to_nearest_obstacle":
                dist, _ = cache.get("obstacle", "both")
                constructed_obs.append(dist)

            case "obstacle_in_path":
                dist, min_pos = cache.get("obstacle", "both")
                if dist >= 1.0:
                    constructed_obs.append(0.0)
                else:
                    obs_in_path = obstacleAvoid(position, rotation, min_pos)
                    constructed_obs.append(float(obs_in_path))

            # --- Target observations (Finder) ---
            case "dist_x_to_target":
                dist, _ = cache.get("target", "x")
                constructed_obs.append(dist)

            case "dist_z_to_target":
                dist, _ = cache.get("target", "y")
                constructed_obs.append(dist)

            case "dist_to_nearest_target":
                dist, _ = cache.get("target", "both")
                constructed_obs.append(dist)

            case "in_target_radius":
                # FIX: use the cached target bucket instead of re-querying
                # entities from scratch, so this stays consistent with the
                # rest of the obs vector within the same step.
                dist, _ = cache.get("target", "both")
                target_bucket = entity_buckets["target"]
                if target_bucket:
                    # getNearestTargetInfo uses its own radius field on each entity;
                    # fall back to it so we respect per-entity radius values.
                    found, best, radius = getNearestTargetInfo(
                        position, runTimeSnapShot, "isTarget"
                    )
                    constructed_obs.append(1.0 if (found and best <= radius) else 0.0)
                else:
                    constructed_obs.append(0.0)

            # --- Pickable observations (Holder) ---
            case "dist_x_to_pickable":
                dist, _ = cache.get("pickable", "x")
                constructed_obs.append(dist)

            case "dist_z_to_pickable":
                dist, _ = cache.get("pickable", "y")
                constructed_obs.append(dist)

            case "dist_to_nearest_pickable":
                dist, _ = cache.get("pickable", "both")
                constructed_obs.append(dist)

            case "holding":
                constructed_obs.append(1.0 if state_space.get("holding") else 0.0)

            # --- Collectable observations (Collector) ---
            case "dist_x_to_collect":
                dist, _ = cache.get("collectable", "x")
                constructed_obs.append(dist)

            case "dist_z_to_collect":
                dist, _ = cache.get("collectable", "y")
                constructed_obs.append(dist)

            case "dist_to_nearest_collectable":
                dist, _ = cache.get("collectable", "both")
                constructed_obs.append(dist)

            case "items_collected":
                constructed_obs.append(
                    min(float(state_space.get("items_collected", 0)) / 10.0, 1.0)
                )

            # --- Deposit observations (Depositor) ---
            case "dist_x_to_deposit":
                dist, _ = cache.get("deposit", "x")
                constructed_obs.append(dist)

            case "dist_z_to_deposit":
                dist, _ = cache.get("deposit", "y")
                constructed_obs.append(dist)

            case "dist_to_nearest_deposit":
                dist, _ = cache.get("deposit", "both")
                constructed_obs.append(dist)

            case "items_deposit":
                constructed_obs.append(
                    min(float(state_space.get("items_deposited", 0)) / 10.0, 1.0)
                )

            case _:
                constructed_obs.append(0.0)

    obs_array = np.array(constructed_obs, dtype=np.float32)
    obs_array = np.nan_to_num(obs_array, nan=0.0, posinf=1.0, neginf=-1.0)
    return obs_array
