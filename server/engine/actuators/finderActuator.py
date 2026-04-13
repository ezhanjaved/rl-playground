from server.utilities.nearestTarget import getNearestTargetInfo


def finderActuator(action, agentData, entities):
    if "Finder" not in agentData.capabilities:
        return False
    if action != "interact":
        return False
    pos = agentData.position
    found, distance, radius = getNearestTargetInfo(pos, entities, "isTarget")
    if found and distance <= radius:
        targetReached = True
    else:
        targetReached = False
    return targetReached
