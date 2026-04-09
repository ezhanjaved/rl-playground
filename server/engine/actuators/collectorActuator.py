import pybullet as p

from server.utilities.nearPick import nearbyPickable


def collectorActuator(action, agent, entities, eM):
    agent = entities[agent.id]
    if action == "collect":
        pickRadius = 1.0  # Engine Defined - Not User
        targetObj = nearbyPickable(
            entities, agent.position, pickRadius, agent.capabilities
        )
        print("Target Object: ", targetObj)
        if not targetObj:
            agent.last_action = action
            return
        if targetObj:
            print("Collecting")
            numberItemsCollected = agent.state_space["items_collected"]
            updatedNum = numberItemsCollected + 1
            agent.last_action = action
            agent.state_space["items_collected"] = updatedNum
            agent.state_space["lastPickSuccess"] = True
            agent.state_space["lastItemCollected"] = targetObj.tag

            bullet_Id = eM[targetObj.id]
            p.removeBody(bullet_Id)
            del entities[targetObj.id]
            return
