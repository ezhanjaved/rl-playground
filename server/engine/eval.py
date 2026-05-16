from profile import run

from server.engine.observationBuilder import (
    collect_predicate,
    deposit_predicate,
    nearestDistance,
    obstacle_predicate,
    partition_entities,
    pickable_predicate,
    target_predicate,
)


def evaluator(aid, agentObs, agentObsAfter, graph, config, runTimeSnap):
    entities = runTimeSnap.entities
    currentEpisodeStep = runTimeSnap.step_count
    if not entities or not graph or not config:
        return 0, False, False, {}

    agent = entities[aid]
    visited_nodes = set()
    postAgentObs = agentObsAfter[aid]
    entity_buckets = partition_entities(entities)

    ctx = {
        "reward": 0.0,
        "terminated": False,
        "truncated": False,
        "_stop": False,
        "info": {},
        "facts": {
            "position": agent.position,
            "rotation": agent.rotation,
            "capabilities": agent.capabilities,
            "last_action": agent.last_action,
            "state_space": agent.state_space,
            "obs_space": agent.observation_space,
        },
        "maxSteps": 300,
        "stepCount": 0,
        "visitedNodes": visited_nodes,
        "config": config,
        "obsVector": agentObs,
        "postObsVector": postAgentObs,
        "ent": entities,
        "buckets": entity_buckets,
        "current_episode_step": currentEpisodeStep,
    }

    start = None
    for node in graph.nodes:
        if node.type == "OnStepNode":
            start = node
            break

    if not start:
        return 0, False, False, {}

    visitNode(start.id, graph, ctx)
    return ctx["reward"], ctx["terminated"], ctx["truncated"], ctx["info"]


def safe_float(x, default=0.0):
    try:
        return float(x)
    except Exception:
        return default


def visitNode(node_id, graph, ctx):
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

    if node_data.type == "AddRewardNode":
        multiplier = safe_float(getattr(ctx["config"], "rewardMultiplier", 1.0))
        reward_value = (
            node_data.data.get("rewardValue", 0)
            if isinstance(node_data.data, dict)
            else getattr(node_data.data, "rewardValue", 0)
        )
        reward_value = safe_float(reward_value)
        ctx["reward"] += reward_value * multiplier

    elif node_data.type == "EndEpisodeNode":
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

    elif node_data.type == "StateEqualsToNode":
        key = node_data.data.get("entityState")
        expected = node_data.data.get("StateStatus")
        expected_bool = expected is True or str(expected).lower() == "true"
        value = ctx["facts"]["state_space"].get(key)
        result = value == expected_bool

        chosen_edge = _find_bool_edge(node_id, graph, result)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "LastActionIsNode":
        action_picked = node_data.data.get("entityAction")
        action_status = node_data.data.get("actionStatus")
        expected = action_status is True or str(action_status).lower() == "true"
        current_last_action = ctx["facts"]["last_action"]
        value = current_last_action == action_picked
        result = expected == value

        chosen_edge = _find_bool_edge(node_id, graph, result)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "CompareStateNode":
        operations = {
            "Less Than": lambda a, b: a < b,
            "Higher Than": lambda a, b: a > b,
            "Less Than Equal To": lambda a, b: a <= b,
            "Higher Than Equal To": lambda a, b: a >= b,
        }

        key = node_data.data.get("entityState")
        numeric_value = node_data.data.get("StateValue")

        try:
            numeric_value = float(numeric_value)
        except (TypeError, ValueError):
            return

        current_state_raw = ctx["facts"]["state_space"].get(key)
        try:
            current_state = float(current_state_raw)
        except (TypeError, ValueError):
            return

        operator = node_data.data.get("Operator")
        op_fn = operations.get(operator)
        if not op_fn:
            return

        result = op_fn(current_state, numeric_value)
        chosen_edge = _find_bool_edge(node_id, graph, result)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "InRadiusNode":
        MAX_DIST = 40.0
        RADIUS_CHECK = 1.5 / MAX_DIST

        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")

        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities
        has_depositor = "Depositor" in capabilities

        def get_obs(key):
            obs_space = ctx["facts"].get("obs_space", [])
            obs_vector = ctx.get("obsVector", [])
            try:
                idx = obs_space.index(key)
                return obs_vector[idx]
            except (ValueError, IndexError):
                return None

        in_radius = False

        if entity_two == "Target Object":
            dist = get_obs("dist_to_nearest_target")
            if dist is not None and dist <= RADIUS_CHECK:
                in_radius = True

        elif entity_two == "Pickable Object":
            if has_holder:
                dist = get_obs("dist_to_nearest_pickable")
                if dist is not None and dist <= RADIUS_CHECK:
                    in_radius = True
            elif has_collector:
                dist = get_obs("dist_to_nearest_collectable")
                if dist is not None and dist <= RADIUS_CHECK:
                    in_radius = True
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                dist = get_obs("dist_to_nearest_deposit")
                if dist is not None and dist <= RADIUS_CHECK:
                    in_radius = True
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, in_radius)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsDistanceLessNode":
        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")

        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities
        has_depositor = "Depositor" in capabilities

        distance_less = False
        buckets = ctx["buckets"]

        def diff_cal(bucket_key, state_key):
            nonlocal distance_less
            agent_pos = ctx["facts"]["position"]
            agent_rot = ctx["facts"]["rotation"]
            previous_distance = ctx["facts"]["state_space"].get(state_key)
            current_distance, _ = nearestDistance(
                agent_pos, agent_rot, buckets[bucket_key], "both"
            )
            if current_distance is not None and previous_distance is not None:
                if current_distance < previous_distance:
                    distance_less = True

        if entity_two == "Target Object":
            diff_cal("target", "previous_distance_target")

        if entity_two == "Non-State Object":
            diff_cal("obstacle", "previous_distance_obstacle")

        elif entity_two == "Pickable Object":
            if has_holder:
                diff_cal("pickable", "previous_distance_pickable")
            elif has_collector:
                diff_cal("collectable", "previous_distance_collect")
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                diff_cal("deposit", "previous_distance_deposit")
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, distance_less)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsDistanceMoreNode":
        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")

        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities
        has_depositor = "Depositor" in capabilities

        distance_more = False
        tolerance = 0.2
        buckets = ctx["buckets"]

        def diff_cal(bucket_key, state_key):
            nonlocal distance_more
            agent_pos = ctx["facts"]["position"]
            agent_rot = ctx["facts"]["rotation"]
            previous_distance = ctx["facts"]["state_space"].get(state_key)
            current_distance, _ = nearestDistance(
                agent_pos, agent_rot, buckets[bucket_key], "both"
            )
            if current_distance is not None and previous_distance is not None:
                if current_distance > previous_distance + tolerance:
                    distance_more = True

        if entity_two == "Target Object":
            diff_cal("target", "previous_distance_target")

        if entity_two == "Non-State Object":
            diff_cal("obstacle", "previous_distance_obstacle")

        elif entity_two == "Pickable Object":
            if has_holder:
                diff_cal("pickable", "previous_distance_pickable")
            elif has_collector:
                diff_cal("collectable", "previous_distance_collect")
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                diff_cal("deposit", "previous_distance_deposit")
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, distance_more)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsDeltaXLessNode":
        DELTA_X_CHECK = 0.05
        delta_x = False

        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")
        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities
        has_depositor = "Depositor" in capabilities
        has_navigator = "Navigator" in capabilities

        def get_obs(key):
            obs_space = ctx["facts"].get("obs_space", [])
            obs_vector = ctx.get("obsVector", [])
            try:
                idx = obs_space.index(key)
                return obs_vector[idx]
            except (ValueError, IndexError):
                return None

        if entity_two == "Target Object":
            val = get_obs("delta_x_to_target")
            if val is not None and abs(val) <= DELTA_X_CHECK:
                delta_x = True

        elif entity_two == "Pickable Object":
            if has_holder:
                val = get_obs("delta_x_to_pickable")
                if val is not None and abs(val) <= DELTA_X_CHECK:
                    delta_x = True
            elif has_collector:
                val = get_obs("delta_x_to_collectable")
                if val is not None and abs(val) <= DELTA_X_CHECK:
                    delta_x = True
            else:
                return

        elif entity_two == "Navigator Object":
            if has_navigator:
                val = get_obs("delta_x_to_obstacle")
                if val is not None and abs(val) <= DELTA_X_CHECK:
                    delta_x = True
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                val = get_obs("delta_x_to_deposit")
                if val is not None and abs(val) <= DELTA_X_CHECK:
                    delta_x = True
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, delta_x)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsDeltaZPosNode":
        DELTA_Z_CHECK = 0.05
        delta_z = False

        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")
        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities
        has_depositor = "Depositor" in capabilities
        has_navigator = "Navigator" in capabilities

        def get_obs(key):
            obs_space = ctx["facts"].get("obs_space", [])
            obs_vector = ctx.get("obsVector", [])
            try:
                idx = obs_space.index(key)
                return obs_vector[idx]
            except (ValueError, IndexError):
                return None

        if entity_two == "Target Object":
            val = get_obs("delta_z_to_target")
            if val is not None and val > DELTA_Z_CHECK:
                delta_z = True

        elif entity_two == "Pickable Object":
            if has_holder:
                val = get_obs("delta_z_to_pickable")
                if val is not None and val > DELTA_Z_CHECK:
                    delta_z = True
            elif has_collector:
                val = get_obs("delta_z_to_collectable")
                if val is not None and val > DELTA_Z_CHECK:
                    delta_z = True
            else:
                return

        elif entity_two == "Navigator Object":
            if has_navigator:
                val = get_obs("delta_z_to_obstacle")
                if val is not None and val > DELTA_Z_CHECK:
                    delta_z = True
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                val = get_obs("delta_z_to_deposit")
                if val is not None and val > DELTA_Z_CHECK:
                    delta_z = True
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, delta_z)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "NumericObsNode":
        operations = {
            "Less Than": lambda a, b: a < b,
            "Higher Than": lambda a, b: a > b,
            "Less Than Equal To": lambda a, b: a <= b,
            "Higher Than Equal To": lambda a, b: a >= b,
            "Equal To": lambda a, b: a == b,
        }
        obs_key = node_data.data.get("obsKey")
        obs_value = node_data.data.get("ObsValue")
        operator = node_data.data.get("Operator")
        mode = node_data.data.get("mode", "Pre")
        obs_vector = (
            ctx.get("postObsVector") if mode == "Post" else ctx.get("obsVector")
        )
        try:
            obs_value = float(obs_value)
        except (TypeError, ValueError):
            return
        obs_space = ctx["facts"].get("obs_space", [])
        try:
            idx = obs_space.index(obs_key)
            current_val = float(obs_vector[idx])
        except (ValueError, IndexError, TypeError):
            return
        op_fn = operations.get(operator)
        if not op_fn:
            return
        result = op_fn(current_val, obs_value)
        chosen_edge = _find_bool_edge(node_id, graph, result)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "BoolObsNode":
        obs_key = node_data.data.get("obsKey")
        expected_status = node_data.data.get("status", "True")
        expected_bool = (
            expected_status is True or str(expected_status).lower() == "true"
        )
        mode = node_data.data.get("mode", "Pre")
        obs_vector = (
            ctx.get("postObsVector") if mode == "Post" else ctx.get("obsVector")
        )
        obs_space = ctx["facts"].get("obs_space", [])
        try:
            idx = obs_space.index(obs_key)
            current_val = obs_vector[idx]
        except (ValueError, IndexError, TypeError):
            return
        as_bool = current_val is True or current_val == 1
        result = as_bool == expected_bool
        chosen_edge = _find_bool_edge(node_id, graph, result)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsObstacleInPath":
        capabilities = ctx["facts"].get("capabilities", [])
        if "Navigator" not in capabilities:
            return

        direction = node_data.data.get("direction", "Forward")
        direction_key_map = {
            "Left": "obstacle_left",
            "Right": "obstacle_right",
            "Forward": "obstacle_forward",
        }
        OBSTACLE_DIST_THRESHOLD = 0.15
        dist_key = direction_key_map.get(direction)
        if not dist_key:
            return

        obs_space = ctx["facts"].get("obs_space", [])
        obs_vector = ctx.get("obsVector", [])

        def get_obs(key):
            try:
                idx = obs_space.index(key)
                return obs_vector[idx]
            except (ValueError, IndexError):
                return None

        directional_dist = get_obs(dist_key)
        in_path = get_obs("obstacle_in_path")

        in_path_bool = in_path is True or in_path == 1
        is_blocked = (
            directional_dist is not None
            and directional_dist <= OBSTACLE_DIST_THRESHOLD
            and in_path_bool
        )

        chosen_edge = _find_bool_edge(node_id, graph, is_blocked)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    for edge in _find_edges(node_id, graph):
        visitNode(edge.target, graph, ctx)
        if ctx["_stop"]:
            return


def _find_edges(node_id, graph):
    return [e for e in graph.edges if e.source == node_id]


def _find_bool_edge(node_id, graph, result):
    edges = _find_edges(node_id, graph)
    match = "true" if result else "false"
    return next(
        (e for e in edges if match in str(getattr(e, "sourceHandle", "")).lower()),
        None,
    )
