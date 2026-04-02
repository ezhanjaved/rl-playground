import math

from utilities.distance3D import distance3D
from utilities.obstaclePath import obstacleAvoid


def target_predicate(e):
    return e.get("isTarget") in (True, "true", 1)


def pickable_predicate(e):
    return e.get("isPickable") in (True, "true", 1)


def collect_predicate(e):
    return e.get("isCollectable") in (True, "true", 1)


def obstacle_predicate(e):
    return e.get("isDecor") in (True, "true", 1)


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
                break
            case "dist_y_to_obstacle":
                distanceObsY, _ = nearestDistance(
                    position, obstacle_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceObsY)
                break
            case "dist_to_nearest_obstacle":
                distanceObs, _ = nearestDistance(
                    position, obstacle_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceObs)
                break
            case "obstacle_in_path":
                distanceObs, minPosOfNO = nearestDistance(
                    position, obstacle_predicate, "both", runTimeSnapShot
                )
                if distanceObs == 1e9:
                    constructed_obs.append(False)
                else:
                    obsInPath = obstacleAvoid(position, rotation, minPosOfNO)
                    constructed_obs.append(obsInPath)
            case "dist_x_to_target":
                distanceTargetX, _ = nearestDistance(
                    position, target_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceTargetX)
                break
            case "dist_y_to_target":
                distanceTargetY, _ = nearestDistance(
                    position, target_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceTargetY)
                break
            case "dist_to_nearest_target":
                distanceTarget, _ = nearestDistance(
                    position, target_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceTarget)
                break
            case "in_target_radius":
                found, distance, radius = getNearestTargetInfo(
                    position, runTimeSnapShot, "isTarget"
                )
                if found and distance <= radius:
                    targetReached = True
                else:
                    targetReached = False
                constructed_obs.append(targetReached)
                break
            case "dist_x_to_pickable":
                distancePickX = nearestDistance(
                    position, pickable_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distancePickX)
                break
            case "dist_y_to_pickable":
                distancePickY = nearestDistance(
                    position, pickable_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distancePickY)
                break
            case "dist_to_nearest_pickable":
                distancePick = nearestDistance(
                    position, pickable_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distancePick)
                break
            case "holding":
                flagStatus = state_space.holding
                constructed_obs.append(flagStatus)
                break
            case "dist_x_to_collect":
                distanceCollectX = nearestDistance(
                    position, collect_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectX)
                break
            case "dist_y_to_collect":
                distanceCollectY = nearestDistance(
                    position, collect_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectY)
                break
            case "dist_to_nearest_collectable":
                distanceCollect = nearestDistance(
                    position, collect_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceCollect)
                break
            case "items_collected":
                itemsCollection = state_space.items_collected
                constructed_obs.append(itemsCollection)
                break


def nearestDistance(position, predicate, mode, entities):
    min = float("inf")
    d = float("-inf")
    minPos = []

    for entity in entities.values():
        if not entity:
            continue
        if not predicate(entity):
            continue
        targetObjPos = entity.position | [0, 0, 0]
        if mode == "both":
            d = distance3D(position, targetObjPos)
        elif mode == "x":
            d = position[0] - targetObjPos[0]
        elif mode == "y":
            d = position[1] - targetObjPos[1]

        if d < min:
            min = d
            minPos = targetObjPos

    return min, minPos
