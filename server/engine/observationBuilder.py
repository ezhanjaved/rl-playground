from utilities.distance3D import distance3D
from utilities.nearestTarget import getNearestTargetInfo
from utilities.obstaclePath import obstacleAvoid


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
                distancePickX = nearestDistance(
                    position, pickable_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distancePickX)
            case "dist_z_to_pickable":
                distancePickY = nearestDistance(
                    position, pickable_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distancePickY)
            case "dist_to_nearest_pickable":
                distancePick = nearestDistance(
                    position, pickable_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distancePick)
            case "holding":
                flagStatus = state_space["holding"]
                constructed_obs.append(flagStatus)
            case "dist_x_to_collect":
                distanceCollectX = nearestDistance(
                    position, collect_predicate, "x", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectX)
            case "dist_z_to_collect":
                distanceCollectY = nearestDistance(
                    position, collect_predicate, "y", runTimeSnapShot
                )
                constructed_obs.append(distanceCollectY)
            case "dist_to_nearest_collectable":
                distanceCollect = nearestDistance(
                    position, collect_predicate, "both", runTimeSnapShot
                )
                constructed_obs.append(distanceCollect)
            case "items_collected":
                itemsCollection = state_space["items_collected"]
                constructed_obs.append(itemsCollection)
    return constructed_obs


def nearestDistance(position, predicate, mode, entities):
    min = float("inf")
    d = float("-inf")
    minPos = []

    for entity in entities.values():
        if not entity:
            continue
        if not predicate(entity):
            continue
        targetObjPos = entity.position
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
