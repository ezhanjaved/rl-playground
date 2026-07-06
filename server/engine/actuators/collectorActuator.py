import pybullet as p

from server.utilities.nearPick import nearbyPickable


def collectorActuator(action, agent, entities, eM, client, indexOfAction):
    agent = entities[agent.id]
    new_state_space = dict(agent.state_space)
    if "Collector" not in agent.capabilities:
        return

    if "TemporalMemory" in agent.capabilities:
        new_state_space["last_action_index"] = indexOfAction
        if agent.last_action == action:
            new_state_space["last_action_counter"] += 1
        else:
            new_state_space["last_action_counter"] = 1

    if action == "collect":
        pickRadius = 2.0  # Engine Defined - Not User
        targetObj = nearbyPickable(
            entities, agent.position, pickRadius, agent.capabilities
        )

        if not targetObj:
            new_state_space["lastPickSuccess"] = False
            # Update to RUNTIME
            agent.last_action = action
            agent.state_space = new_state_space
            return

        numberItemsCollected = agent.state_space["items_collected"]
        updatedNum = numberItemsCollected + 1

        if targetObj.name == "Key":
            numberOfKeysPresent = agent.state_space["keys_collected"]
            updatedKey = numberOfKeysPresent + 1
            new_state_space["keys_collected"] = updatedKey

        new_state_space["lastItemCollected"] = targetObj.tag
        new_state_space["total_items_collected"] = updatedNum
        new_state_space["items_collected"] = updatedNum
        new_state_space["lastPickSuccess"] = True
        new_state_space["previous_distance_collect"] = 1.0
        # Update to RUNTIME
        agent.last_action = action
        agent.state_space = new_state_space

        bullet_Id = eM[targetObj.id]
        p.removeBody(bullet_Id, physicsClientId=client)
        del entities[targetObj.id]
