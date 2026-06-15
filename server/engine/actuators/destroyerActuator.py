import pybullet as p

from server.utilities.nearestTarget import getNearestTargetInfo


def destroyActuator(action, agent, entities, eM, client, indexOfAction):
    agent = entities[agent.id]
    new_state_space = dict(agent.state_space)

    if "Destroyer" not in agent.capabilities:
        return

    if "TemporalMemory" in agent.capabilities:
        new_state_space["last_action_index"] = indexOfAction
        if agent.last_action == action:
            new_state_space["last_action_counter"] += 1
        else:
            new_state_space["last_action_counter"] = 1

    if action != "destroy":
        agent.last_action = action
        agent.state_space = new_state_space
        return

    found, best, targetRadius, entityId = getNearestTargetInfo(
        agent.position, entities, "destroyable"
    )
    target_reached = found and best <= targetRadius

    if not target_reached:
        new_state_space["nearDestroyable"] = False
        new_state_space["lastDestroySuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space
        return

    target_entity = entities[entityId]

    if target_entity.state.get("isDestroyed"):
        new_state_space["lastDestroySuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space
        return

    new_state_space["nearDestroyable"] = True
    new_state_space["lastDestroySuccess"] = True
    new_state_space["items_destroyed"] = new_state_space["items_destroyed"] + 1

    agent.last_action = action
    agent.state_space = new_state_space

    bullet_id = eM[entityId]
    p.removeBody(bullet_id, physicsClientId=client)
    del entities[entityId]
