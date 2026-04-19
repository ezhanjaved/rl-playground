def previousDistanceCorrection(entities, obs, last_action, agent):
    capabilities = agent.capabilities
    agent_id = agent.id
    obs_space = agent.observation_space

    new_state_space = dict(agent.state_space)

    for cap in capabilities:
        match cap:
            case "Finder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_target")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_target"] = obs[index]

            case "Holder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_pickable")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_pickable"] = obs[index]

            case "Collector":
                index = getIndexOfObs(obs_space, "dist_to_nearest_collectable")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_collect"] = obs[index]

            case "Depositor":
                index = getIndexOfObs(obs_space, "dist_to_nearest_deposit")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_deposit"] = obs[index]
            case "Navigator":
                pass

    agent = entities[agent_id]
    agent.last_action = last_action
    agent.state_space = new_state_space


def getIndexOfObs(observation_space, key):
    try:
        return observation_space.index(key)
    except ValueError:
        return None
