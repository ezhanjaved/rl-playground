from server.engine.observationBuilder import (
    collect_predicate,
    deposit_predicate,
    nearestDistance,
    obstacle_predicate,
    partition_entities,
    pickable_predicate,
    target_predicate,
)


def evaluator(aid, agentObs, graph, config, runTimeSnap):
    entities = runTimeSnap.entities
    if not entities or not graph or not config:
        return 0, False, False, {}

    agent = entities[aid]
    visited_nodes = set()

    entity_buckets = partition_entities(entities)

    ctx = {
        "reward": 0.0,
        "terminated": False,
        "truncated": False,
        "_stop": False,  # FIX: internal traversal-stop flag, separate from terminated
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
        "ent": entities,
        "buckets": entity_buckets,
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

    entities = ctx["ent"]

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

    elif node_data.type == "IsDistanceXLessNode":
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

        distance_less_x = False
        buckets = ctx["buckets"]

        def diff_cal(bucket_key, state_key):
            nonlocal distance_less_x
            agent_pos = ctx["facts"]["position"]
            agent_rot = ctx["facts"]["rotation"]
            previous_distance = ctx["facts"]["state_space"].get(state_key)
            current_distance, _ = nearestDistance(
                agent_pos, agent_rot, buckets[bucket_key], "x"
            )
            if current_distance is not None and previous_distance is not None:
                if current_distance < previous_distance:
                    distance_less_x = True

        if entity_two == "Target Object":
            diff_cal("target", "previous_distance_target_x")

        if entity_two == "Non-State Object":
            diff_cal("obstacle", "previous_distance_obstacle_x")

        elif entity_two == "Pickable Object":
            if has_holder:
                diff_cal("pickable", "previous_distance_pickable_x")
            elif has_collector:
                diff_cal("collectable", "previous_distance_collect_x")
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                diff_cal("deposit", "previous_distance_deposit_x")
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, distance_less_x)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    elif node_data.type == "IsDistanceZLessNode":
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

        distance_less_y = False
        buckets = ctx["buckets"]

        def diff_cal(bucket_key, state_key):
            nonlocal distance_less_y
            agent_pos = ctx["facts"]["position"]
            agent_rot = ctx["facts"]["rotation"]
            previous_distance = ctx["facts"]["state_space"].get(state_key)
            current_distance, _ = nearestDistance(
                agent_pos, agent_rot, buckets[bucket_key], "y"
            )
            if current_distance is not None and previous_distance is not None:
                if current_distance < previous_distance:
                    distance_less_y = True

        if entity_two == "Target Object":
            diff_cal("target", "previous_distance_target_z")

        if entity_two == "Non-State Object":
            diff_cal("obstacle", "previous_distance_obstacle_z")

        elif entity_two == "Pickable Object":
            if has_holder:
                diff_cal("pickable", "previous_distance_pickable_z")
            elif has_collector:
                diff_cal("collectable", "previous_distance_collect_z")
            else:
                return

        elif entity_two == "Deposit Object":
            if has_depositor:
                diff_cal("deposit", "previous_distance_deposit_z")
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, distance_less_y)
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

    elif node_data.type == "TruncateEpisodeNode":
        ctx["truncated"] = True
        ctx["_stop"] = True
        return

    elif node_data.type == "ObsValueNode":
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
        try:
            obs_value = float(obs_value)
        except (TypeError, ValueError):
            return
        obs_space = ctx["facts"].get("obs_space", [])
        obs_vector = ctx.get("obsVector", [])
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
