from server.engine.observationBuilder import nearestDistance, partition_entities


def evaluator(aid, preObs, post_obs, graph, config, runTimeSnap):
    entities = runTimeSnap.entities
    currentEpisodeStep = runTimeSnap.step_count
    if not entities or not graph or not config:
        return (
            0,
            False,
            False,
            {
                "shaping_cum": runTimeSnap.cumulative_shaping_reward.get(aid, 0.0),
                "terminal_cum": runTimeSnap.cumulative_terminal_reward.get(aid, 0.0),
            },
        )

    agent = entities[aid]
    visited_nodes = set()
    behavior_obs_space = agent.behaviorObs
    post_obs_vector = post_obs[agent.id]
    entity_buckets = partition_entities(entities)
    cum_shaping_rew = runTimeSnap.cumulative_shaping_reward[aid]
    cum_terminal_rew = runTimeSnap.cumulative_terminal_reward[aid]

    ctx = {
        "runtime": runTimeSnap,
        "aid": aid,
        "reward": 0.0,
        "terminated": False,
        "truncated": False,
        "_stop": False,
        "info": {
            "shaping_cum": cum_shaping_rew,
            "terminal_cum": cum_terminal_rew,
        },
        "facts": {
            "position": agent.position,
            "rotation": agent.rotation,
            "capabilities": agent.capabilities,
            "last_action": agent.last_action,
            "state_space": agent.state_space,
            "obs_space": behavior_obs_space,
        },
        "maxSteps": 300,
        "stepCount": 0,
        "visitedNodes": visited_nodes,
        "config": config,
        "preObs": preObs,
        "postObs": post_obs_vector,
        "ent": entities,
        "buckets": entity_buckets,
        "current_episode_step": currentEpisodeStep,
        "current_cum_shaping_rew": cum_shaping_rew,
        "current_cum_terminal_rew": cum_terminal_rew,
    }

    start = None
    for node in graph.nodes:
        if node.type == "OnStepNode":
            start = node
            break

    if not start:
        return (
            0.0,
            False,
            False,
            {
                "shaping_cum": runTimeSnap.cumulative_shaping_reward.get(aid, 0.0),
                "terminal_cum": runTimeSnap.cumulative_terminal_reward.get(aid, 0.0),
            },
        )

    _visit_node(start.id, graph, ctx)

    return (
        ctx["reward"],
        ctx["terminated"],
        ctx["truncated"],
        ctx["info"],
    )


def _safe_float(x, default=0.0):
    try:
        return float(x)
    except Exception:
        return default


def _get_obs(key, ctx, use_post=False):
    obs_space = ctx["facts"].get("obs_space", [])
    obs_vector = ctx.get("postObs") if use_post else ctx.get("preObs")
    try:
        idx = obs_space.index(key)
        return obs_vector[idx]
    except (ValueError, IndexError, TypeError):
        return None


def _resolve_goal_context(ctx):
    def is_set(key):
        v = _get_obs(key, ctx)
        return v == 1 or v is True

    if is_set("goal_is_target"):
        return {"bucket_key": "target", "state_key": "previous_distance_target"}
    if is_set("goal_is_collectable"):
        return {"bucket_key": "collectable", "state_key": "previous_distance_collect"}
    if is_set("goal_is_holding"):
        return {"bucket_key": "pickable", "state_key": "previous_distance_pickable"}
    if is_set("goal_is_deposit"):
        return {"bucket_key": "deposit", "state_key": "previous_distance_deposit"}
    if is_set("goal_is_gate"):
        return {"bucket_key": "gate", "state_key": "previous_distance_gate"}
    if is_set("goal_is_destroyable"):
        return {
            "bucket_key": "destroyable",
            "state_key": "previous_distance_destroyable",
        }
    if is_set("goal_is_football"):
        return {"bucket_key": "ball", "state_key": "previous_distance_ball"}
    return None


def _find_edges(node_id, graph):
    return [e for e in graph.edges if e.source == node_id]


def _find_bool_edges(node_id, graph, result):
    edges = _find_edges(node_id, graph)
    match = "true" if result else "false"
    return [e for e in edges if match in str(getattr(e, "sourceHandle", "")).lower()]


def _visit_node(node_id, graph, ctx):
    if ctx["_stop"]:
        return
    if ctx["stepCount"] > ctx["maxSteps"]:
        ctx["truncated"] = True
        ctx["_stop"] = True
        return
    if node_id in ctx["visitedNodes"]:
        return

    ctx["visitedNodes"].add(node_id)
    ctx["stepCount"] += 1

    node_data = None
    for node in graph.nodes:
        if node.id == node_id:
            node_data = node
            break
    if node_data is None:
        return

    ntype = node_data.type

    if ntype == "AddRewardNode":
        multiplier = _safe_float(getattr(ctx["config"], "rewardMultiplier", 1.0))
        reward_value = _safe_float(
            node_data.data.get("rewardValue", 0)
            if isinstance(node_data.data, dict)
            else getattr(node_data.data, "rewardValue", 0)
        )
        reward_type = node_data.data.get("typeOfReward") or "Shaping"
        runtime = ctx["runtime"]
        aid = ctx["aid"]

        if reward_type == "Shaping":
            runtime.cumulative_shaping_reward[aid] += reward_value
        elif reward_type == "Terminal":
            runtime.cumulative_terminal_reward[aid] += reward_value

        ctx["info"]["shaping_cum"] = runtime.cumulative_shaping_reward[aid]
        ctx["info"]["terminal_cum"] = runtime.cumulative_terminal_reward[aid]
        ctx["reward"] += reward_value * multiplier

    elif ntype == "EndEpisodeNode":
        ctx["terminated"] = True
        ctx["_stop"] = True
        return

    elif node_data.type == "TruncateEpisodeNode":
        maxSteps = node_data.data.get("maxSteps", 500)
        maxSteps = int(maxSteps)
        current_steps = ctx["current_episode_step"]
        if current_steps >= maxSteps:
            ctx["truncated"] = True
            ctx["_stop"] = True
        return

    elif ntype == "StateEqualsToNode":
        key = node_data.data.get("entityState")
        expected = node_data.data.get("StateStatus")
        expected_bool = expected is True or str(expected).lower() == "true"
        value = ctx["facts"]["state_space"].get(key)
        result = value == expected_bool

        for edge in _find_bool_edges(node_id, graph, result):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "LastActionIsNode":
        action_picked = node_data.data.get("entityAction")
        action_status = node_data.data.get("actionStatus")
        expected = action_status is True or str(action_status).lower() == "true"
        value = ctx["facts"]["last_action"] == action_picked
        result = expected == value

        for edge in _find_bool_edges(node_id, graph, result):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "CompareStateNode":
        operations = {
            "Less Than": lambda a, b: a < b,
            "Higher Than": lambda a, b: a > b,
            "Less Than Equal To": lambda a, b: a <= b,
            "Higher Than Equal To": lambda a, b: a >= b,
            "Equal To": lambda a, b: a == b,
        }
        key = node_data.data.get("entityState")
        try:
            numeric_value = float(node_data.data.get("StateValue"))
        except (TypeError, ValueError):
            return
        try:
            current_state = float(ctx["facts"]["state_space"].get(key))
        except (TypeError, ValueError):
            return

        op_fn = operations.get(node_data.data.get("Operator"))
        if not op_fn:
            return

        result = op_fn(current_state, numeric_value)
        for edge in _find_bool_edges(node_id, graph, result):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "InRadiusNode":
        mode = node_data.data.get("mode") or "Upon Entrance"
        in_radius_raw_pre = _get_obs(
            "in_radius_current_goal", ctx
        )  # this gives in_target_radius from pre obs
        in_radius_raw_post = _get_obs("in_radius_current_goal", ctx, use_post=True)
        in_radius = False
        if mode == "Upon Entrance":
            if in_radius_raw_pre == 0.0 and in_radius_raw_post == 1.0:
                in_radius = True

        if mode == "Within Radius":
            if in_radius_raw_pre == 1.0:
                in_radius = True

        if mode == "Upon Exit":
            if in_radius_raw_pre == 1.0 and in_radius_raw_post == 0.0:
                in_radius = True

        for edge in _find_bool_edges(node_id, graph, in_radius):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsDeltaXLessNode":
        DELTA_X_CHECK = 0.05

        delta_x = False
        val = _get_obs("delta_x_to_current_goal", ctx)
        if val is not None and abs(val) <= DELTA_X_CHECK:
            delta_x = True

        for edge in _find_bool_edges(node_id, graph, delta_x):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsDeltaZPosNode":
        DELTA_Z_CHECK = 0.05

        delta_z = False
        val = _get_obs("delta_z_to_current_goal", ctx)
        if val is not None and val > DELTA_Z_CHECK:
            delta_z = True

        for edge in _find_bool_edges(node_id, graph, delta_z):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsDistanceLessNode":
        mode = node_data.data.get("mode") or "Best Record"
        goal_ctx = _resolve_goal_context(ctx)
        if goal_ctx is None:
            return  # no recognized goal flag active; skip node

        distance_less = False

        bucket = ctx["buckets"].get(goal_ctx["bucket_key"], [])
        if mode == "Best Record":
            agent_pos = ctx["facts"]["position"]
            agent_rot = ctx["facts"]["rotation"]
            current_distance = _get_obs("dist_to_current_goal", ctx, use_post=True)
            best_distance = ctx["facts"]["state_space"].get(goal_ctx["state_key"])
            if current_distance is not None and best_distance is not None:
                if current_distance < best_distance:
                    distance_less = True

        elif mode == "Raw Distance":
            # pre-action and post-action distances from behavior OBS
            previous_dist = _get_obs("dist_to_current_goal", ctx, use_post=False)
            current_distance = _get_obs("dist_to_current_goal", ctx, use_post=True)
            if current_distance is not None and previous_dist is not None:
                if current_distance < previous_dist:
                    distance_less = True

        for edge in _find_bool_edges(node_id, graph, distance_less):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsDistanceMoreNode":
        tolerance = 0.2

        goal_ctx = _resolve_goal_context(ctx)
        if goal_ctx is None:
            return

        bucket = ctx["buckets"].get(goal_ctx["bucket_key"], [])
        agent_pos = ctx["facts"]["position"]
        agent_rot = ctx["facts"]["rotation"]
        current_distance, _ = nearestDistance(
            agent_pos,
            agent_rot,
            bucket,
            "both",
        )
        previous_distance = ctx["facts"]["state_space"].get(goal_ctx["state_key"])

        distance_more = (
            current_distance is not None
            and previous_distance is not None
            and current_distance > previous_distance + tolerance
        )

        for edge in _find_bool_edges(node_id, graph, distance_more):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "NumericObsNode":
        operations = {
            "Less Than": lambda a, b: a < b,
            "Higher Than": lambda a, b: a > b,
            "Less Than Equal To": lambda a, b: a <= b,
            "Higher Than Equal To": lambda a, b: a >= b,
            "Equal To": lambda a, b: a == b,
        }
        obs_key = node_data.data.get("obsKey")
        operator = node_data.data.get("Operator")
        mode = node_data.data.get("mode", "Pre")

        try:
            obs_value = float(node_data.data.get("ObsValue"))
        except (TypeError, ValueError):
            return

        if not obs_key or not operator:
            return

        current_val = _get_obs(obs_key, ctx, use_post=(mode == "Post"))
        if current_val is None:
            return
        try:
            current_val = float(current_val)
        except (TypeError, ValueError):
            return

        op_fn = operations.get(operator)
        if not op_fn:
            return

        result = op_fn(current_val, obs_value)
        for edge in _find_bool_edges(node_id, graph, result):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "BoolObsNode":
        obs_key = node_data.data.get("obsKey")
        if not obs_key:
            return

        expected_status = node_data.data.get("status", "True")
        expected_bool = (
            expected_status is True or str(expected_status).lower() == "true"
        )
        mode = node_data.data.get("mode", "Pre")

        current_val = _get_obs(obs_key, ctx, use_post=(mode == "Post"))
        if current_val is None:
            return

        as_bool = current_val is True or current_val == 1
        result = as_bool == expected_bool

        for edge in _find_bool_edges(node_id, graph, result):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsObstacleInPath":
        if "Navigator" not in ctx["facts"].get("capabilities", []):
            return

        direction = node_data.data.get("direction", "Forward")
        mode = node_data.data.get("mode", "While Blocked")
        direction_key_map = {
            "Left": "obstacle_left",
            "Right": "obstacle_right",
            "Forward": "obstacle_forward",
        }
        OBSTACLE_DIST_THRESHOLD_UPPER = 0.35
        OBSTACLE_DIST_THRESHOLD_LOWER = 0.40

        dist_key = direction_key_map.get(direction)
        if not dist_key:
            return

        directional_dist_pre = _get_obs(dist_key, ctx)
        directional_dist_post = _get_obs(dist_key, ctx, use_post=True)
        in_path_pre = _get_obs("obstacle_in_path", ctx)
        in_path_post = _get_obs("obstacle_in_path", ctx, use_post=True)

        in_path_bool_pre = in_path_pre is True or in_path_pre == 1
        in_path_bool_post = in_path_post is True or in_path_post == 1

        fires_up = False

        if mode == "Upon Leaving":
            if in_path_bool_pre is True and in_path_bool_post is False:
                fires_up = True

        if mode == "Upon Getting Blocked":
            if in_path_bool_pre is False and in_path_bool_post is True:
                fires_up = True

        if mode == "While Blocked":
            if in_path_bool_post is True:
                fires_up = True

        if mode == "Upon Approaching":
            distance_decreased = directional_dist_post < directional_dist_pre

            entered_approach_band = (
                directional_dist_pre >= OBSTACLE_DIST_THRESHOLD_LOWER
                and OBSTACLE_DIST_THRESHOLD_LOWER
                > directional_dist_post
                > OBSTACLE_DIST_THRESHOLD_UPPER
            )

            if (
                not in_path_bool_pre
                and not in_path_bool_post
                and distance_decreased
                and entered_approach_band
            ):
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "FootballEventNode":
        mode = node_data.data.get("mode") or "Team Scored Goal"
        team_goal_scored_pre = _get_obs("team_goals_scored", ctx)
        team_goal_scored_post = _get_obs("team_goals_scored", ctx, use_post=True)
        team_goal_conceded_pre = _get_obs("team_goals_conceded", ctx)
        team_goal_conceded_post = _get_obs("team_goals_conceded", ctx, use_post=True)
        my_goals_scored_pre = _get_obs("my_goals_scored", ctx)
        my_goals_scored_post = _get_obs("my_goals_scored", ctx, use_post=True)
        my_own_goals_scored_pre = _get_obs("my_own_goals_scored", ctx)
        my_own_goals_scored_post = _get_obs("my_own_goals_scored", ctx, use_post=True)

        fires_up = False
        if mode == "Team Scored Goal":
            if team_goal_scored_pre < team_goal_scored_post:
                fires_up = True

        if mode == "Team Conceded Goal":
            if team_goal_conceded_pre < team_goal_conceded_post:
                fires_up = True

        if mode == "Player Scored Goal":
            if my_goals_scored_pre < my_goals_scored_post:
                fires_up = True

        if mode == "Player Scored Own Goal":
            if my_own_goals_scored_pre < my_own_goals_scored_post:
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsPlayerAlignedNode":
        mode = node_data.data.get("mode") or "While Aligned"
        is_aligned_pre = _get_obs("alignment_to_goal", ctx)
        is_aligned_post = _get_obs("alignment_to_goal", ctx, use_post=True)
        fires_up = False

        if mode == "Upon Aligning":
            if is_aligned_pre == 0.0 and is_aligned_post == 1.0:
                fires_up = True

        if mode == "While Aligned":
            if is_aligned_pre == 1.0 and is_aligned_post == 1.0:
                fires_up = True

        if mode == "Leaving Alignment":
            if is_aligned_pre == 1.0 and is_aligned_post == 0.0:
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsBallNearPostNode":
        mode = node_data.data.get("mode") or "While In Danger"
        is_danger_pre = _get_obs("ball_in_own_goal_danger_zone", ctx)
        is_danger_post = _get_obs("ball_in_own_goal_danger_zone", ctx, use_post=True)
        fires_up = False

        if mode == "Entered Danger Zone":
            if is_danger_pre == 0.0 and is_danger_post == 1.0:
                fires_up = True

        if mode == "While In Danger":
            if is_danger_pre == 1.0 and is_danger_post == 1.0:
                fires_up = True

        if mode == "Left Danger Zone":
            if is_danger_pre == 1.0 and is_danger_post == 0.0:
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "ProgressToPost":
        mode = node_data.data.get("mode") or "Best Record"
        goal_ctx = _resolve_goal_context(ctx)
        if goal_ctx is None:
            return  # no recognized goal flag active; skip node

        distance_less = False

        bucket = ctx["buckets"].get(goal_ctx["bucket_key"], [])
        if mode == "Best Record":
            current_distance = _get_obs("dist_to_target_goal", ctx, use_post=True)
            best_distance = ctx["facts"]["state_space"]["previous_distance_goal"]
            if current_distance is not None and best_distance is not None:
                if current_distance < best_distance:
                    distance_less = True

        elif mode == "Raw Distance":
            # pre-action and post-action distances from behavior OBS
            previous_dist = _get_obs("dist_to_target_goal", ctx, use_post=False)
            current_distance = _get_obs("dist_to_target_goal", ctx, use_post=True)
            if current_distance is not None and previous_dist is not None:
                if current_distance < previous_dist:
                    distance_less = True

        for edge in _find_bool_edges(node_id, graph, distance_less):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return


    elif ntype == "IsPlayerNearPost":
        DIST_THRESHOLD_TO_POST = 0.15
        current_dist_to_goal_post = _get_obs("dist_to_target_goal", ctx, use_post=True)
        fires_up = False

        if current_dist_to_goal_post < DIST_THRESHOLD_TO_POST:
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    elif ntype == "IsBallProgressing":
        previous_dist_to_goal_post = _get_obs("ball_dist_to_enemy_goal", ctx, use_post=False)
        current_dist_to_goal_post = _get_obs("ball_dist_to_enemy_goal", ctx, use_post=True)
        fires_up = False

        if current_dist_to_goal_post < previous_dist_to_goal_post:
                fires_up = True

        for edge in _find_bool_edges(node_id, graph, fires_up):
            _visit_node(edge.target, graph, ctx)
            if ctx["_stop"]:
                return
        return

    for edge in _find_edges(node_id, graph):
        _visit_node(edge.target, graph, ctx)
        if ctx["_stop"]:
            return
