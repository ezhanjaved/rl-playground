import pybullet as p

from server.utilities.nearestTarget import getNearestTargetInfo


def openActuator(action, agent, entities, eM, client, indexOfAction):
    agent = entities[agent.id]
    new_state_space = dict(agent.state_space)

    if "Opener" not in agent.capabilities:
        return

    if "TemporalMemory" in agent.capabilities:
        new_state_space["last_action_index"] = indexOfAction
        if agent.last_action == action:
            new_state_space["last_action_counter"] += 1
        else:
            new_state_space["last_action_counter"] = 1

    if action != "open":
        agent.last_action = action
        agent.state_space = new_state_space
        return

    found, best, targetRadius, entityId = getNearestTargetInfo(
        agent.position, entities, "static-obj"
    )
    target_reached = found and best <= targetRadius

    if not target_reached:
        new_state_space["nearGate"] = False
        new_state_space["lastOpenSuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space
        return

    entity_id = entityId
    target_entity = entities[entity_id]

    new_state_space["nearGate"] = True

    if target_entity.state.get("isOpen"):
        new_state_space["lastOpenSuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space
        return

    if new_state_space["keys_collected"] > 0:
        new_state_space["lastOpenSuccess"] = True
        new_state_space["keys_collected"] -= 1
        new_state_space["gates_open"] = new_state_space["gates_open"] + 1

        agent.last_action = action
        agent.state_space = new_state_space

        bullet_id = eM[entity_id]
        p.removeBody(bullet_id, physicsClientId=client)
        del entities[entity_id]
    else:
        # gate near but no key
        new_state_space["lastOpenSuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space
