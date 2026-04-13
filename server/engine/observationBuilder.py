import numpy as np

from server.utilities.distance3D import distance3D
from server.utilities.nearestTarget import getNearestTargetInfo
from server.utilities.obstaclePath import obstacleAvoid


def target_predicate(e):
    return getattr(e, "isTarget", False) in (True, "true", 1)


def pickable_predicate(e):
    return getattr(e, "isPickable", False) in (True, "true", 1)


def collect_predicate(e):
    return getattr(e, "isCollectable", False) in (True, "true", 1)


def obstacle_predicate(e):
    return getattr(e, "isDecor", False) in (True, "true", 1)


def buildObs(agent_id, agentData, runTimeSnapShot):
    obs_space = agentData.observation_space
    state_space = agentData.state_space
    position = agentData.position
    rotation = agentData.rotation
    constructed_obs = []
    for obs in obs_space:
        match obs:
            case "dist_x_to_obstacle":
                distanceObsX, _ = nearestDistance(
                    position, obstacle_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceObsX)
            case "dist_z_to_obstacle":
                distanceObsY, _ = nearestDistance(
                    position, obstacle_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceObsY)
            case "dist_to_nearest_obstacle":
                distanceObs, _ = nearestDistance(
                    position, obstacle_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceObs)
            case "obstacle_in_path":
                distanceObs, minPosOfNO = nearestDistance(
                    position, obstacle_predicate, "both", runTimeSnapShot
                )
                if distanceObs == 100.0:
                    constructed_obs.append(False)
                else:
                    obsInPath = obstacleAvoid(position, rotation, minPosOfNO)
                    constructed_obs.append(obsInPath)
            case "dist_x_to_target":
                distanceTargetX, _ = nearestDistance(
                    position, target_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceTargetX)
            case "dist_z_to_target":
                distanceTargetY, _ = nearestDistance(
                    position, target_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceTargetY)
            case "dist_to_nearest_target":
                distanceTarget, _ = nearestDistance(
                    position, target_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceTarget)
            case "in_target_radius":
                found, best, radius = getNearestTargetInfo(
                    position, runTimeSnapShot, "isTarget"
                )
                if found and best <= radius:
                    targetReached = True
                else:
                    targetReached = False
                constructed_obs.append(targetReached)
            case "dist_x_to_pickable":
                distancePickX, _ = nearestDistance(
                    position, pickable_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distancePickX)
            case "dist_z_to_pickable":
                distancePickY, _ = nearestDistance(
                    position, pickable_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distancePickY)
            case "dist_to_nearest_pickable":
                distancePick, _ = nearestDistance(
                    position, pickable_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distancePick)
            case "holding":
                flagStatus = state_space["holding"]
                constructed_obs.append(flagStatus)
            case "dist_x_to_collect":
                distanceCollectX, _ = nearestDistance(
                    position, collect_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectX)
            case "dist_z_to_collect":
                distanceCollectY, _ = nearestDistance(
                    position, collect_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectY)
            case "dist_to_nearest_collectable":
                distanceCollect, _ = nearestDistance(
                    position, collect_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceCollect)
            case "items_collected":
                itemsCollection = state_space["items_collected"]
                constructed_obs.append(itemsCollection)

    obs = np.array(constructed_obs, dtype=np.float32)
    obs = np.nan_to_num(obs, nan=0.0, posinf=1.0, neginf=-1.0)
    return obs


def nearestDistance(position, predicate, mode, entities):
    MAX_DIST = 100.0
    min = float("100.0")
    d = float("-100.0")
    minPos = []
    found = False

    for entity in entities.values():
        if not entity:
            continue
        if not predicate(entity):
            continue
        targetObjPos = entity.position
        if mode == "both":
            d = distance3D(position, targetObjPos)
        elif mode == "x":
            d = abs(position[0] - targetObjPos[0])
        elif mode == "y":
            d = abs(position[1] - targetObjPos[1])

        if d < min:
            min = d
            minPos = targetObjPos
            found = True
    if not found:
        return 100.0, []
    else:
        normalizedDist = min / MAX_DIST
        return normalizedDist, minPos
