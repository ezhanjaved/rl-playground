import pybullet as p

from server.utilities.positionSwap import positionSwap


def footballRef(goal_id, ball_id, entities, mapping, client):
    scoringTeam = None
    concedingTeam = None
    lastTouchedBy = None
    lastTouchedTeam = None
    isOwnGoal = None
    ball_id_entity = mapping[ball_id]
    ball = entities[ball_id_entity]
    ball_state = dict(ball.state)

    if ball_state["goalLocked"]:
        print("Goal Locked!")
        return

    ball_state["goalLocked"] = True
    ball.state = ball_state

    if goal_id == "red":
        scoringTeam = "blue"
        concedingTeam = "red"
    elif goal_id == "blue":
        scoringTeam = "red"
        concedingTeam = "blue"

    lastTouchedBy = ball_state["lastTouchedBy"]
    lastTouchedTeam = ball_state["lastTouchedTeam"]
    isOwnGoal = lastTouchedTeam == concedingTeam

    for agentId, agentData in entities.items():
        if agentData.tag != "agent" or not agentData.teamId:
            continue

        agentStateSpace = dict(agentData.state_space)

        if agentData.teamId == scoringTeam:
            current_teams_goal_sco = agentStateSpace["team_goals_scored"]
            current_teams_goal_sco += 1
            agentStateSpace["team_goals_scored"] = current_teams_goal_sco

        if agentData.teamId == concedingTeam:
            current_teams_goal_con = agentStateSpace["team_goals_conceded"]
            current_teams_goal_con += 1
            agentStateSpace["team_goals_conceded"] = current_teams_goal_con

        if agentId == lastTouchedBy:
            if isOwnGoal:
                current_my_own_goal = agentStateSpace["my_own_goals_scored"]
                current_my_own_goal += 1
                agentStateSpace["my_own_goals_scored"] = current_my_own_goal

                agentStateSpace["last_goal_type"] = False
            else:
                current_my_goal = agentStateSpace["my_goals_scored"]
                current_my_goal += 1
                agentStateSpace["my_goals_scored"] = current_my_goal

                agentStateSpace["last_goal_type"] = True
        else:
            agentStateSpace["last_goal_type"] = None

        agentStateSpace["previous_distance_ball"] = None
        agentStateSpace["previous_distance_ball"] = None

    resetBallToKickOff(ball_id, ball, client)


def resetBallToKickOff(ballBulletId, ball, client):
    # updated the position in entities
    positionSpawned = ball.positionSpawned  # This is Three.js position
    swappedPos = positionSwap(
        positionSpawned
    )  # Will convert it into PyBullet Convention
    ball.position = swappedPos

    # updated the position of physical body
    _, current_orn = p.getBasePositionAndOrientation(
        ballBulletId, physicsClientId=client
    )

    p.resetBasePositionAndOrientation(ballBulletId, swappedPos, current_orn)
    p.resetBaseVelocity(
        ballBulletId,
        linearVelocity=[0, 0, 0],
        angularVelocity=[0, 0, 0],
        physicsClientId=client,
    )
