def heuristic_controller(obs, runTimeState):
    actions = {}

    for agent_id, agent_obs in obs.items():
        agent_rotation_y = agent_obs[0]
        last_action = agent_obs[1]
        dist_to_nearest_coll = agent_obs[2]
        delta_x_to_coll = agent_obs[3]
        delta_z_to_coll = agent_obs[4]
        items_collected = agent_obs[5]
        last_pick_success = agent_obs[6]
        dist_to_nearest_dep = agent_obs[7]
        delta_x_to_dep = agent_obs[8]
        delta_z_to_dep = agent_obs[9]
        items_deposit = agent_obs[10]
        last_deposit_success = agent_obs[11]

        CLOSE_ENOUGH = 1.5 / 40.0

        if items_collected == 0:
            if dist_to_nearest_coll < CLOSE_ENOUGH:
                action = "collect"
            else:
                if abs(delta_x_to_coll) > abs(delta_z_to_coll):
                    action = "move_right" if delta_x_to_coll > 0 else "move_left"
                else:
                    action = "move_up"

        else:
            if dist_to_nearest_dep < CLOSE_ENOUGH:
                action = "deposit"
            else:
                if abs(delta_x_to_dep) > abs(delta_z_to_dep):
                    action = "move_right" if delta_x_to_dep > 0 else "move_left"
                else:
                    action = "move_up"

        actions[agent_id] = action

    return actions
