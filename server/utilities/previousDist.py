import math


def previousDistanceCorrection(entities, obs, last_action, agent):
    capabilities = agent.capabilities

    actionSpace = agent.action_space
    indexOfAction = actionSpace.index(last_action)

    agent_id = agent.id
    obs_space = agent.observation_space

    # previous distance should be updated only when agent has did an action from MOVEABLE ability - interact/collect does not reduce distance
    if last_action not in ["move_up", "move_right", "move_left", "idle"]:
        agent = entities[agent_id]
        agent.last_action = last_action
        if "TemporalMemory" in agent.capabilities:
            agent.state_space["last_action_index"] = indexOfAction
        return

    new_state_space = dict(agent.state_space)
    if "TemporalMemory" in agent.capabilities:
        agent.state_space["last_action_index"] = indexOfAction

    for cap in capabilities:
        match cap:
            case "Finder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_target")
                if index is not None and index < len(obs):
                    best = new_state_space["previous_distance_target"]
                    if best is None or (isinstance(best, float) and math.isnan(best)):
                        best = float("inf")
                    if obs[index] < best:
                        new_state_space["previous_distance_target"] = obs[index]

            case "Holder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_pickable")
                if index is not None and index < len(obs):
                    best = new_state_space["previous_distance_pickable"]
                    if best is None or (isinstance(best, float) and math.isnan(best)):
                        best = float("inf")
                    if obs[index] < best:
                        new_state_space["previous_distance_pickable"] = obs[index]

            case "Collector":
                index = getIndexOfObs(obs_space, "dist_to_nearest_collectable")
                if index is not None and index < len(obs):
                    best = new_state_space["previous_distance_collect"]
                    if best is None or (isinstance(best, float) and math.isnan(best)):
                        best = float("inf")
                    if obs[index] < best:
                        new_state_space["previous_distance_collect"] = obs[index]

            case "Depositor":
                index = getIndexOfObs(obs_space, "dist_to_nearest_deposit")
                if index is not None and index < len(obs):
                    best = new_state_space["previous_distance_deposit"]
                    if best is None or (isinstance(best, float) and math.isnan(best)):
                        best = float("inf")
                    if obs[index] < best:
                        new_state_space["previous_distance_deposit"] = obs[index]

    agent = entities[agent_id]
    agent.last_action = last_action
    agent.state_space = new_state_space


def getIndexOfObs(observation_space, key):
    try:
        return observation_space.index(key)
    except ValueError:
        return None
