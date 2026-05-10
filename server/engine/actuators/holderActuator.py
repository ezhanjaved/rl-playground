import pybullet as p

from server.objectClass.entitiesClass import Object
from server.utilities.nearPick import nearbyPickable


def holderActuator(action, agentData, entities, eM, client, indexOfAction):
    agentPos = agentData.position
    capabilities = agentData.capabilities
    agent = entities[agentData.id]

    # if an agent is not Holder but system has picked action that is of holder do not do anything - ignore it
    if "Holder" not in capabilities:
        return

    if action == "pick":
        pickRadius = 1.5  # Engine Defined - Not User
        targetObj = nearbyPickable(entities, agentPos, pickRadius, capabilities)
        if not targetObj:
            agent.last_action = action
            agent.state_space["last_action_index"] = indexOfAction
            agent.state_space["lastPickSuccess"] = False
            return

        if targetObj:
            if agent.state_space["holding"]:
                agent.last_action = action
                agent.state_space["last_action_index"] = indexOfAction
                agent.state_space["lastPickSuccess"] = False
                return
            elif not agent.state_space["holding"]:
                bulletId = eM[targetObj.id]
                p.removeBody(bulletId, physicsClientId=client)
                agent.last_action = action
                agent.state_space["last_action_index"] = indexOfAction
                agent.state_space["holding"] = True
                agent.state_space["lastPickSuccess"] = True
                del entities[targetObj.id]
            return
        else:
            agent.last_action = action
            agent.state_space["last_action_index"] = indexOfAction
            agent.state_space["lastPickSuccess"] = True
            return

    if action == "drop" and agent.state_space["holding"]:
        [wx, wy, wz] = agentData.position
        wx += 2
        wy += 2
        newPos = [-wx, wy, 0]

        convertedRot = p.getQuaternionFromEuler([0, 0, 0], physicsClientId=client)
        collider = {"shape": "capsule", "h": 1, "r": 0.4}
        holderId = spawn_non_state(newPos, convertedRot, collider, client)

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
        agent.state_space["last_action_index"] = indexOfAction
        agent.state_space["holding"] = False
        agent.state_space["lastPickSuccess"] = False
        return
    else:
        agent.last_action = action
        agent.state_space["last_action_index"] = indexOfAction
        agent.state_space["lastPickSuccess"] = False
        return


def spawn_non_state(pos, rot, collider, client):
    r = collider.get("r", 0.4)
    h = collider.get("h", 1.0)
    cylinder_height = max(0.0, h - 2 * r)
    collision_shape = p.createCollisionShape(
        p.GEOM_CAPSULE,
        radius=r,
        height=cylinder_height,
        physicsClientId=client,
    )
    px, py, _ = pos
    pos = (px, py, h / 2)
    return p.createMultiBody(
        baseMass=0,
        baseCollisionShapeIndex=collision_shape,
        basePosition=pos,
        baseOrientation=rot,
        physicsClientId=client,
    )
