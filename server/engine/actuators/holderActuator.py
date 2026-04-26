import pybullet as p

from server.objectClass.entitiesClass import Object
from server.utilities.nearPick import nearbyPickable


def holderActuator(action, agentData, entities, eM, client):
    agentPos = agentData.position
    capabilities = agentData.capabilities
    agent = entities[agentData.id]

    # if an agent is not Holder but system has picked action that is of holder do not do anything - ignore it
    if "Holder" not in capabilities:
        return

    if action == "pick":
        pickRadius = 1.0  # Engine Defined - Not User
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
                p.removeBody(bulletId, physicsClientId=client)
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
        newPos = [wx, wy, 0]

        convertedRot = p.getQuaternionFromEuler([0, 0, 0], physicsClientId=client)
        holderId = p.loadURDF(
            "cube.urdf",
            newPos,
            convertedRot,
            useFixedBase=True,
            globalScaling=0.2,
            physicsClientId=client,
        )

        entityId = str(holderId)
        eM[entityId] = holderId

        droppedObj = {
            "tag": "Pickable Object",
            "name": "X Pickable",
            "collider": {"shape": "capsule", "h": 1, "r": 0.4},
            "position": newPos,
            "rotation": agentData.rotation,
            "quatRotation": convertedRot,
            "isDecor": "false",
            "isPickable": "true",
            "isCollectable": "false",
            "isTarget": "false",
            "isDeposit": "false",
        }

        entities[entityId] = Object(
            id=str(entityId),
            tag=droppedObj["tag"],
            name=droppedObj["name"],
            position=droppedObj["position"],
            rotation=droppedObj["rotation"],
            quatRotation=droppedObj["quatRotation"],
            isDecor=droppedObj["isDecor"],
            isDeposit=droppedObj["isDeposit"],
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
