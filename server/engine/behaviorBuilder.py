from dataclasses import dataclass

NAVIGATOR_FIELDS = [
    "obstacle_forward",
    "obstacle_left",
    "obstacle_right",
    "obstacle_in_path",
]

BASE_GOAL_FIELDS = [
    "dist_to_current_goal",
    "delta_x_to_current_goal",
    "delta_z_to_current_goal",
    "in_radius_current_goal",
    "last_action_success",
]

PROGRESS_FIELDS = [
    "items_collected",
    "keys_collected",
    "total_items_collected",
    "holding",
    "items_deposited",
    "hasKey",
    "gates_open",
    "items_destroyed",
    "in_target_radius",
]

BEHAVIOR_CONFIG = {
    "Collect": {
        "goalFlag": "goal_is_collectable",
        "done": lambda s, stage: (
            s["total_items_collected"] >= get_required_count(stage)
        ),
        "progressFields": [
            "items_collected",
            "keys_collected",
            "total_items_collected",
        ],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_collectable",
            "delta_x_to_current_goal": "delta_x_to_collectable",
            "delta_z_to_current_goal": "delta_z_to_collectable",
            "in_radius_current_goal": "in_radius_collect",
            "last_action_success": "lastPickSuccess",
        },
    },
    "Holding": {
        "goalFlag": "goal_is_holding",
        "done": lambda s, stage: s["holding"] >= get_required_count(stage),
        "progressFields": ["holding"],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_pickable",
            "delta_x_to_current_goal": "delta_x_to_pickable",
            "delta_z_to_current_goal": "delta_z_to_pickable",
            "in_radius_current_goal": "in_radius_holder",
            "last_action_success": "lastPickSuccess",
        },
    },
    "Deposit": {
        "goalFlag": "goal_is_deposit",
        "done": lambda s, stage: s["items_deposited"] >= get_required_count(stage),
        "progressFields": ["items_deposited"],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_deposit",
            "delta_x_to_current_goal": "delta_x_to_deposit",
            "delta_z_to_current_goal": "delta_z_to_deposit",
            "in_radius_current_goal": "in_radius_deposit",
            "last_action_success": "last_deposit_success",
        },
    },
    "Open": {
        "goalFlag": "goal_is_gate",
        "done": lambda s, stage: s["gates_open"] >= get_required_count(stage),
        "progressFields": ["hasKey", "gates_open"],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_gate",
            "delta_x_to_current_goal": "delta_x_to_gate",
            "delta_z_to_current_goal": "delta_z_to_gate",
            "in_radius_current_goal": "in_radius_gate",
            "last_action_success": "last_open_success",
        },
    },
    "Destroy": {
        "goalFlag": "goal_is_destroyable",
        "done": lambda s, stage: s["items_destroyed"] >= get_required_count(stage),
        "progressFields": ["items_destroyed"],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_destroyable",
            "delta_x_to_current_goal": "delta_x_to_destroyable",
            "delta_z_to_current_goal": "delta_z_to_destroyable",
            "in_radius_current_goal": "in_radius_destroy",
            "last_action_success": "last_destroy_success",
        },
    },
    "Find": {
        "goalFlag": "goal_is_target",
        "done": lambda s, stage: s["in_target_radius"] >= get_required_count(stage),
        "progressFields": ["in_target_radius"],
        "fields": {
            "dist_to_current_goal": "dist_to_nearest_target",
            "delta_x_to_current_goal": "delta_x_to_target",
            "delta_z_to_current_goal": "delta_z_to_target",
            "in_radius_current_goal": "in_target_radius",
            "last_action_success": None,
        },
    },
}


@dataclass
class BehaviorBuilderResult:
    current_behavior: str
    behavior_obs_vector: list[float]
    behavior_obs_space: list[str]
    behavior_obs_object: dict[str, float]


def has_capability(capabilities: list[str], capability_name: str) -> bool:
    return capability_name in capabilities


def get_stage_type(stage) -> str:
    if isinstance(stage, str):
        return stage
    return stage.get("type") if isinstance(stage, dict) else None


def get_required_count(stage) -> float:
    if isinstance(stage, dict):
        return stage.get("requiredCount", 10) / 10.0
    return 1.0


def build_progress_fields(behavior: list) -> list[str]:
    seen = set()
    result = []
    for stage in behavior:
        stage_type = get_stage_type(stage)
        config = BEHAVIOR_CONFIG.get(stage_type)
        if config:
            for field in config["progressFields"]:
                if field not in seen:
                    seen.add(field)
                    result.append(field)
    return result


def build_behavior_obs_space(behavior: list, capabilities: list[str]) -> list[str]:
    goal_flags = []
    for stage in behavior:
        stage_type = get_stage_type(stage)
        config = BEHAVIOR_CONFIG.get(stage_type)
        if config and config.get("goalFlag"):
            goal_flags.append(config["goalFlag"])

    progress_fields = build_progress_fields(behavior)
    obs_space = [*BASE_GOAL_FIELDS, *progress_fields, *goal_flags]

    if has_capability(capabilities, "Navigator"):
        obs_space.extend(NAVIGATOR_FIELDS)

    return obs_space


def pick_current_behavior(behavior: list, state: dict) -> str:
    for stage in behavior:
        stage_type = get_stage_type(stage)
        config = BEHAVIOR_CONFIG.get(stage_type)
        if not config:
            continue
        if not config["done"](state, stage):
            return stage_type

    last_stage = behavior[-1] if behavior else None
    return get_stage_type(last_stage) or "Find"


def get_obs_value(
    observation_space: list[str],
    obs_vector: list,
    obs_name: str,
    default_value: float = 0.0,
) -> float:
    try:
        index = observation_space.index(obs_name)
    except ValueError:
        return default_value
    value = obs_vector[index] if index < len(obs_vector) else None
    return float(value) if value is not None else default_value


def get_state(obs_vector: list, agent) -> dict:
    observation_space = agent.observation_space or []
    return {
        field: get_obs_value(observation_space, obs_vector, field, 0.0)
        for field in PROGRESS_FIELDS
    }


def behavior_builder(obs_vector: list, agent) -> BehaviorBuilderResult:
    behavior = agent.behavior or []
    capabilities = agent.capabilities or []
    observation_space = agent.observation_space or []
    behavior_obs_space = agent.behaviorObs or build_behavior_obs_space(
        behavior, capabilities
    )

    state = get_state(obs_vector, agent)
    current_behavior = pick_current_behavior(behavior, state)
    config = BEHAVIOR_CONFIG.get(current_behavior)

    output = {field: 0.0 for field in behavior_obs_space}

    progress_fields = build_progress_fields(behavior)
    for field in progress_fields:
        output[field] = state.get(field, 0.0)

    if has_capability(capabilities, "Navigator"):
        for field in NAVIGATOR_FIELDS:
            output[field] = get_obs_value(observation_space, obs_vector, field, 0.0)

    if config and config.get("fields"):
        for behavior_field, raw_field in config["fields"].items():
            output[behavior_field] = (
                0.0
                if raw_field is None
                else get_obs_value(observation_space, obs_vector, raw_field, 0.0)
            )

    if config and config.get("goalFlag"):
        output[config["goalFlag"]] = 1.0

    behavior_obs_vector = [float(output.get(key, 0.0)) for key in behavior_obs_space]

    agent.current_behavior = current_behavior

    behaviorOBJ = BehaviorBuilderResult(
        current_behavior=current_behavior,
        behavior_obs_vector=behavior_obs_vector,
        behavior_obs_space=behavior_obs_space,
        behavior_obs_object=output,
    )

    return behaviorOBJ
