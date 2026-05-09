from server.utilities.nearestTarget import getNearestTargetInfo


def finderActuator(action, agentData, entities, indexOfAction):
    if "Finder" not in agentData.capabilities:
        return
    if action != "interact":
        agentData.last_action = action
        agentData.state_space["last_action_index"] = indexOfAction
        return
    pos = agentData.position
    found, distance, radius = getNearestTargetInfo(pos, entities, "target")
    if found and distance <= radius:
        targetReached = True
    else:
        targetReached = False

    agentData.last_action = action
    agentData.state_space["targetReached"] = targetReached
    agentData.state_space["last_action_index"] = indexOfAction
    return
