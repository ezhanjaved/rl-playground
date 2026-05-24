from server.utilities.nearestTarget import getNearestTargetInfo


def finderActuator(action, agentData, entities, indexOfAction):
    if "Finder" not in agentData.capabilities:
        return

    new_state_space = dict(agentData.state_space)

    if "TemporalMemory" in agentData.capabilities:
        new_state_space["last_action_index"] = indexOfAction
        if agentData.last_action == action:
            new_state_space["last_action_counter"] += 1
        else:
            new_state_space["last_action_counter"] = 1

    if action != "interact":
        # Update to RUNTIME
        agentData.last_action = action
        agentData.state_space = new_state_space
        return

    pos = agentData.position
    found, distance, radius = getNearestTargetInfo(pos, entities, "target")
    if found and distance <= radius:
        targetReached = True
    else:
        targetReached = False

    new_state_space["targetReached"] = targetReached
    # Update to RUNTIME
    agentData.last_action = action
    agentData.state_space = new_state_space
    return
