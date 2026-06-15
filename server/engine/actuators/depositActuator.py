from server.utilities.nearestTarget import getNearestTargetInfo


def depositActuator(action, agent_data, entities, indexOfAction):
    if "Depositor" not in agent_data.capabilities:
        return

    agent = entities[agent_data.id]
    new_state_space = dict(agent.state_space)

    if "TemporalMemory" in agent.capabilities:
        new_state_space["last_action_index"] = indexOfAction
        if agent.last_action == action:
            new_state_space["last_action_counter"] += 1
        else:
            new_state_space["last_action_counter"] = 1

    if action != "deposit":
        # Update to RUNTIME
        agent.last_action = action
        agent.state_space = new_state_space
        return

    found, distance, radius, _ = getNearestTargetInfo(
        agent.position, entities, "deposit"
    )

    is_near_deposit = found and distance <= radius

    if not found or distance > radius:
        new_state_space["lastDepositSuccess"] = False
        new_state_space["nearDeposit"] = is_near_deposit
        # Update to RUNTIME
        agent.last_action = action
        agent.state_space = new_state_space
        return

    is_holder = "Holder" in agent.capabilities
    is_collector = "Collector" in agent.capabilities

    holding_item = is_holder and agent.state_space.get("holding", False)
    collected_items = agent.state_space.get("items_collected", 0) if is_collector else 0

    if not holding_item and collected_items == 0:
        new_state_space["lastDepositSuccess"] = False
        new_state_space["nearDeposit"] = is_near_deposit
        # Update to RUNTIME
        agent.last_action = action
        agent.state_space = new_state_space
        return

    items_just_deposited = 0

    if holding_item:
        new_state_space["holding"] = False
        new_state_space["lastPickSuccess"] = False
        items_just_deposited += 1

    if collected_items > 0:
        new_state_space["items_collected"] = 0
        new_state_space["lastItemCollected"] = None
        items_just_deposited += collected_items

    previous_deposit = new_state_space.get("items_deposited", 0)
    new_state_space["items_deposited"] = previous_deposit + items_just_deposited
    new_state_space["nearDeposit"] = is_near_deposit
    new_state_space["lastDepositSuccess"] = True
    # Update to RUNTIME
    agent.last_action = action
    agent.state_space = new_state_space
