from server.utilities.nearestTarget import getNearestTargetInfo


def depositActuator(action, agent_data, entities):
    if "Depositor" not in agent_data.capabilities:
        return

    agent = entities[agent_data.id]

    if action != "deposit":
        agent.last_action = action
        return

    found, distance, radius = getNearestTargetInfo(
        agent.position, entities, "isDeposit"
    )

    if not found or distance > radius:
        agent.last_action = action
        return

    is_holder = "Holder" in agent.capabilities
    is_collector = "Collector" in agent.capabilities

    holding_item = is_holder and agent.state_space.get("holding", False)
    collected_items = agent.state_space.get("items_collected", 0) if is_collector else 0

    if not holding_item and collected_items == 0:
        agent.last_action = action
        return

    items_just_deposited = 0

    if holding_item:
        agent.state_space["holding"] = False
        agent.state_space["heldItemAssetRef"] = None
        agent.state_space["lastPickSuccess"] = False
        items_just_deposited += 1

    if collected_items > 0:
        agent.state_space["items_collected"] = 0
        agent.state_space["lastItemCollected"] = None
        items_just_deposited += collected_items

    previous_deposit = agent.state_space.get("items_deposited", 0)
    agent.state_space["items_deposited"] = previous_deposit + items_just_deposited
    agent.state_space["nearDeposit"] = True
    agent.last_action = action
