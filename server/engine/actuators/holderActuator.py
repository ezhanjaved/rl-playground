import pybullet as p

from server.objectClass.entitiesClass import Object
from server.utilities.nearPick import nearbyPickable


def holderActuator(action, agentData, entities, eM):
    from training.bulletWorld import PyBulletWorld

    agentPos = agentData.position
    capabilities = agentData.capabilities
    agent = entities[agentData.id]

    if action == "pick":
        pickRadius = 2.0  # Engine Defined - Not User
        targetObj = nearbyPickable(entities, agentPos, pickRadius, capabilities)
        if not targetObj:
            agent.last_action = action
            return

        if targetObj:
            if agent.state_space["holding"]:
                agent.last_action = action
                return
            elif not agent.state_space["holding"]:
                bulletId = eM[targetObj.id]
                p.removeBody(bulletId)
                print("Picking Item")
                agent.last_action = action
                agent.state_space["holding"] = True
                agent.state_space["lastPickSuccess"] = True
                del entities[targetObj.id]
            return
        else:
            agent.last_action = action
            return

    if action == "drop" and agent.state_space["holding"]:
        [wx, wy, wz] = agentData.position

        wx += 2
        wy += 2

        newPos = [wx, wy, wz]

        entityId = 123
        holderId = PyBulletWorld.spawn_holders(newPos, agentData.rotation)
        eM[entityId] = holderId

        droppedObj = {
            "tag": "Pickable",
            "name": "X Pickable",
            "collider": {"shape": "capsule", "h": 1, "r": 0.4},
            "position": newPos,
            "rotation": agentData.rotation,
            "isDecor": "true",
            "isPickable": "true",
            "isCollectable": "false",
            "isTarget": "false",
        }

        entities[entityId] = Object(
            id=str(entityId),
            tag=droppedObj["tag"],
            name=droppedObj["name"],
            position=droppedObj["position"],
            rotation=droppedObj["rotation"],
            isDecor=droppedObj["isDecor"],
            isPickable=droppedObj["isPickable"],
            isCollectable=droppedObj["isCollectable"],
            isTarget=droppedObj["isTarget"],
        )

        agent.last_action = action
        agent.state_space["holding"] = False
        agent.state_space["lastPickSuccess"] = False
        return
    else:
        agent.last_action = action
        return
