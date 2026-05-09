def heuristic_controller(obs, runTimeState):
    actions = {}

    for agent_id, agent_obs in obs.items():
        agent_rotation_y = agent_obs[0]
        last_action = agent_obs[1]
        dist_to_nearest_target = agent_obs[2]
        delta_x_to_target = agent_obs[3]
        delta_z_to_target = agent_obs[4]
        in_target_radius = agent_obs[5]

        if in_target_radius == 1:
            action = "interact"
        else:
            if abs(delta_x_to_target) > abs(delta_z_to_target):
                action = "move_right" if delta_x_to_target > 0 else "move_left"
            else:
                action = "move_up"

        actions[agent_id] = action

    return actions
