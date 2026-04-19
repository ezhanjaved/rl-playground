import pybullet as p

from server.utilities.nearPick import nearbyPickable


def collectorActuator(action, agent, entities, eM, client):
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
            return

        # FIX: removed the dead `if targetObj` check — always True here
        # since `not targetObj` already returned above
        numberItemsCollected = agent.state_space["items_collected"]
        updatedNum = numberItemsCollected + 1
        agent.last_action = action
        agent.state_space["items_collected"] = updatedNum
        agent.state_space["lastPickSuccess"] = True
        agent.state_space["lastItemCollected"] = targetObj.tag

        bullet_Id = eM[targetObj.id]
        p.removeBody(bullet_Id, physicsClientId=client)
        del entities[targetObj.id]
