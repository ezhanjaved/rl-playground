PREVIOUS_DISTANCE_BY_BEHAVIOR = {
    "Find": "previous_distance_target",
    "Collect": "previous_distance_collect",
    "Holding": "previous_distance_pickable",
    "Deposit": "previous_distance_deposit",
    "Destroy": "previous_distance_destroyable",
    "Open": "previous_distance_gate",
    "Football": "previous_distance_ball",
}


# obs send will be behavior obs vector too
def previousDistanceCorrection(entities, obs_b, obs_a, current_action, agent):
    agent_id = agent.id
    fresh_agent = entities[agent_id]
    obs_space = fresh_agent.behaviorObs  # should read behavior obs space
    current_behavior = fresh_agent.current_behavior  # should read current behavior

    new_state_space = dict(agent.state_space)
    action_space = agent.action_space
    index_of_action = action_space.index(current_action)

    # previous distance should be updated only when agent has did an action from MOVEABLE ability - interact/collect does not reduce distance
    if current_action not in [
        "move_up",
        "move_right",
        "move_left",
        "idle",
        "collect",
        "deposit",
        "destroy",
        "open",
        "interact",
        "pick",
        "drop",
        "kick",
    ]:
        agent = entities[agent_id]
        if "TemporalMemory" in agent.capabilities:
            new_state_space["last_action_index"] = index_of_action
            if agent.last_action == current_action:
                new_state_space["last_action_counter"] += 1
            else:
                new_state_space["last_action_counter"] = 1
        agent.last_action = current_action
        agent.state_space = new_state_space
        return

    dist_index = getIndexOfObs(obs_space, "dist_to_current_goal")
    current_goal_distance = (
        obs_b[dist_index]
        if dist_index is not None and dist_index < len(obs_b)
        else None
    )

    previous_distance_key = PREVIOUS_DISTANCE_BY_BEHAVIOR.get(current_behavior)

    if previous_distance_key and current_goal_distance is not None:
        best = new_state_space.get(previous_distance_key, float("inf"))
        if best is None:
            best = float("inf")

        if best == 1:
            current_goal_distance = (
                obs_a[dist_index]
                if dist_index is not None and dist_index < len(obs_a)
                else None
            )

        if current_goal_distance < best:
            new_state_space[previous_distance_key] = current_goal_distance

    if "TemporalMemory" in agent.capabilities:
        new_state_space["last_action_index"] = index_of_action
        if agent.last_action == current_action:
            new_state_space["last_action_counter"] = (
                new_state_space.get("last_action_counter") or 0
            ) + 1
        else:
            new_state_space["last_action_counter"] = 1

    if "Footballer" in agent.capabilities:
        previous_distance_key = "previous_distance_goal"
        dist_index = getIndexOfObs(obs_space, "dist_to_target_goal")
        current_goal_distance = (
            obs_b[dist_index]
            if dist_index is not None and dist_index < len(obs_b)
            else None
        )
        if previous_distance_key and current_goal_distance is not None:
            best = new_state_space.get(previous_distance_key, float("inf"))
            if best is None:
                best = float("inf")
            if current_goal_distance < best:
                new_state_space[previous_distance_key] = current_goal_distance

    fresh_agent.last_action = current_action
    fresh_agent.state_space = new_state_space


def getIndexOfObs(observation_space, key):
    try:
        return observation_space.index(key)
    except ValueError:
        return None
