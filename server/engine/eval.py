from server.engine.observationBuilder import (
    collect_predicate,
    nearestDistance,
    obstacle_predicate,
    pickable_predicate,
    target_predicate,
)


def evaluator(aid, agentObs, graph, config, runTimeSnap):
    entities = runTimeSnap.entities
    if not entities or not graph or not config:
        return 0, False, False, {}

    agent = entities[aid]
    visited_nodes = set()

    ctx = {
        "reward": 0,
        "terminated": False,
        "truncated": False,
        "info": {},
        "facts": {
            "position": agent.position,
            "capabilities": agent.capabilities,
            "last_action": agent.last_action,
            "state_space": agent.state_space,
            "obs_space": agent.observation_space,
        },
        "maxSteps": 50,
        "stepCount": 0,
        "visitedNodes": visited_nodes,
        "config": config,
        "obsVector": agentObs,
        "ent": entities,
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


def visitNode(node_id, graph, ctx):
    if ctx["terminated"]:
        return
    if ctx["stepCount"] > ctx["maxSteps"]:
        ctx["truncated"] = True
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
        multiplier = getattr(ctx["config"], "rewardMultiplier", 1)
        reward_value = (
            node_data.data.get("rewardValue", 0)
            if isinstance(node_data.data, dict)
            else getattr(node_data.data, "rewardValue", 0)
        )
        ctx["reward"] += reward_value * multiplier

    elif node_data.type == "EndEpisodeNode":
        ctx["terminated"] = True
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
        RADIUS_CHECK = 1  # Engine-defined constant

        entity_one = node_data.data.get("entityOne")
        entity_two = node_data.data.get("entityTwo")

        is_agent_1 = entity_one == "Agent"
        is_agent_2 = entity_two == "Agent"

        if is_agent_1 == is_agent_2:
            return

        capabilities = ctx["facts"].get("capabilities", [])
        has_holder = "Holder" in capabilities
        has_collector = "Collector" in capabilities

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

        distance_less = False

        def diff_cal(predicate, state_key):
            nonlocal distance_less
            agent_pos = ctx["facts"]["position"]
            previous_distance = ctx["facts"]["state_space"].get(state_key)
            current_distance = nearestDistance(agent_pos, predicate, "both", entities)
            if current_distance is not None and previous_distance is not None:
                if current_distance < previous_distance:
                    distance_less = True

        if entity_two == "Target Object":
            diff_cal(target_predicate, "previous_distance_target")

        elif entity_two == "Pickable Object":
            if has_holder:
                diff_cal(pickable_predicate, "previous_distance_pickable")
            elif has_collector:
                diff_cal(collect_predicate, "previous_distance_collect")
            else:
                return

        chosen_edge = _find_bool_edge(node_id, graph, distance_less)
        if chosen_edge:
            visitNode(chosen_edge.target, graph, ctx)
        return

    for edge in _find_edges(node_id, graph):
        visitNode(edge.target, graph, ctx)
        if ctx["terminated"]:
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
