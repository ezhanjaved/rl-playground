import pybullet as p

from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap
from server.utilities.rotationCal import getForwardVectorFromYaw, getYaw


# This helper function will find entities by their tag
def find_ent(entities, tag):
    first_matched = None
    for ent in entities.values():
        if ent.tag == tag:
            first_matched = ent.id
            break
    if first_matched:
        return entities[first_matched]
    else:
        return None


def footballActuator(action, agentData, entities, eM, client, indexOfAction):
    agent = entities[agentData.id]
    agent_bullet_id = eM[agentData.id]
    new_state_space_agent = dict(agent.state_space)
    if "Footballer" not in agent.capabilities:
        return

    if "TemporalMemory" in agent.capabilities:
        new_state_space_agent["last_action_index"] = indexOfAction
        if agent.last_action == action:
            new_state_space_agent["last_action_counter"] += 1
        else:
            new_state_space_agent["last_action_counter"] = 1

    if action != "kick":
        agent.last_action = action
        agent.state_space = new_state_space_agent
        return

    ball = find_ent(entities, "ball")
    if ball is None:
        agent.last_action = action
        agent.state_space = new_state_space_agent
        return

    ball_bullet_id = eM[ball.id]
    new_state_space_ball = dict(ball.state)

    agentPos, agentQuat = p.getBasePositionAndOrientation(
        agent_bullet_id, physicsClientId=client
    )
    rot = p.getEulerFromQuaternion(agentQuat, physicsClientId=client)
    yaw = getYaw(rot)
    Rx, Ry = getForwardVectorFromYaw(yaw)

    ballPos, _ = p.getBasePositionAndOrientation(ball_bullet_id, physicsClientId=client)
    dist = distance3D(agentPos, ballPos)
    kickRadius = 2.0
    kickStrength = 15.0

    if kickRadius < dist:
        new_state_space_agent["lastKickSuccess"] = False
        agent.last_action = action
        agent.state_space = new_state_space_agent
        return

    linear_vel, angular_vel = p.getBaseVelocity(ball_bullet_id)
    _, _, lz = linear_vel

    new_linear_vel = [Rx * kickStrength, Ry * kickStrength, lz]

    p.resetBaseVelocity(
        ball_bullet_id,
        linearVelocity=new_linear_vel,
        angularVelocity=angular_vel,
        physicsClientId=client,
    )

    new_state_space_agent["lastKickSuccess"] = True
    new_state_space_agent["previous_distance_ball"] = 1.0

    agent.last_action = action
    agent.state_space = new_state_space_agent

    new_state_space_ball["lastTouchedBy"] = agent.id
    new_state_space_ball["lastTouchedTeam"] = agent.teamId

    ball.state = new_state_space_ball
