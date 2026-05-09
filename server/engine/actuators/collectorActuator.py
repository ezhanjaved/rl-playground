import pybullet as p

from server.utilities.nearPick import nearbyPickable


def collectorActuator(action, agent, entities, eM, client, indexOfAction):
    agent = entities[agent.id]

    if "Collector" not in agent.capabilities:
        return

    if action == "collect":
        pickRadius = 1.5  # Engine Defined - Not User
        targetObj = nearbyPickable(
            entities, agent.position, pickRadius, agent.capabilities
        )

        if not targetObj:
            agent.last_action = action
            agent.state_space["last_action_index"] = indexOfAction
            agent.state_space["lastPickSuccess"] = False
            return

        numberItemsCollected = agent.state_space["items_collected"]
        updatedNum = numberItemsCollected + 1

        agent.last_action = action
        agent.state_space["last_action_index"] = indexOfAction
        agent.state_space["lastItemCollected"] = targetObj.tag
        agent.state_space["items_collected"] = updatedNum
        agent.state_space["lastPickSuccess"] = True

        bullet_Id = eM[targetObj.id]
        p.removeBody(bullet_Id, physicsClientId=client)
        del entities[targetObj.id]
