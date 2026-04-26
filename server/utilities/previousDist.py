def previousDistanceCorrection(entities, obs, last_action, agent):
    capabilities = agent.capabilities
    agent_id = agent.id
    obs_space = agent.observation_space
    # previous distance should be updated only when agent has did an action from MOVEABLE ability - interact/collect does not reduce distance
    if last_action not in ["move_up", "move_down", "move_right", "move_left"]:
        agent = entities[agent_id]
        agent.last_action = last_action
        return

    new_state_space = dict(agent.state_space)

    for cap in capabilities:
        match cap:
            case "Finder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_target")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_target"] = obs[index]
                # index = getIndexOfObs(obs_space, "dist_x_to_target")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_target_x"] = obs[index]
                # index = getIndexOfObs(obs_space, "dist_z_to_target")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_target_z"] = obs[index]

            case "Holder":
                index = getIndexOfObs(obs_space, "dist_to_nearest_pickable")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_pickable"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_x_to_pickable")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_pickable_x"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_z_to_pickable")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_pickable_z"] = obs[index]

            case "Collector":
                index = getIndexOfObs(obs_space, "dist_to_nearest_collectable")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_collect"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_x_to_collect")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_collect_x"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_z_to_collect")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_collect_z"] = obs[index]

            case "Depositor":
                index = getIndexOfObs(obs_space, "dist_to_nearest_deposit")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_deposit"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_x_to_deposit")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_deposit_x"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_z_to_deposit")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_deposit_z"] = obs[index]

            case "Navigator":
                index = getIndexOfObs(obs_space, "dist_to_nearest_obstacle")
                if index is not None and index < len(obs):
                    new_state_space["previous_distance_obstacle"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_x_to_obstacle")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_obstacle_x"] = obs[index]

                # index = getIndexOfObs(obs_space, "dist_z_to_obstacle")
                # if index is not None and index < len(obs):
                #     new_state_space["previous_distance_obstacle_z"] = obs[index]

    agent = entities[agent_id]
    agent.last_action = last_action
    agent.state_space = new_state_space


def getIndexOfObs(observation_space, key):
    try:
        return observation_space.index(key)
    except ValueError:
        return None
