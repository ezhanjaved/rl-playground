const NAVIGATOR_FIELDS = [
  "obstacle_forward",
  "obstacle_left",
  "obstacle_right",
  "obstacle_in_path",
];

const BASE_GOAL_FIELDS = [
  "dist_to_current_goal",
  "delta_x_to_current_goal",
  "delta_z_to_current_goal",
  "in_radius_current_goal",
  "last_action_success",
];

const PROGRESS_FIELDS = [
  "items_collected",
  "keys_collected",
  "total_items_collected",
  "holding",
  "items_deposited",
  "hasKey",
  "gates_open",
  "items_destroyed",
  "in_target_radius",
];

const BEHAVIOR_CONFIG = {
  Collect: {
    goalFlag: "goal_is_collectable",
    done: (s, stage) => s.total_items_collected >= getRequiredCount(stage),
    progressFields: [
      "items_collected",
      "keys_collected",
      "total_items_collected",
    ],
    fields: {
      dist_to_current_goal: "dist_to_nearest_collectable",
      delta_x_to_current_goal: "delta_x_to_collectable",
      delta_z_to_current_goal: "delta_z_to_collectable",
      in_radius_current_goal: "in_radius_collect",
      last_action_success: "lastPickSuccess",
    },
  },

  Holding: {
    goalFlag: "goal_is_holding",
    done: (s, stage) => s.holding >= getRequiredCount(stage),
    progressFields: ["holding"],
    fields: {
      dist_to_current_goal: "dist_to_nearest_pickable",
      delta_x_to_current_goal: "delta_x_to_pickable",
      delta_z_to_current_goal: "delta_z_to_pickable",
      in_radius_current_goal: "in_radius_holder",
      last_action_success: "lastPickSuccess",
    },
  },

  Deposit: {
    goalFlag: "goal_is_deposit",
    done: (s, stage) => s.items_deposited >= getRequiredCount(stage),
    progressFields: ["items_deposited"],
    fields: {
      dist_to_current_goal: "dist_to_nearest_deposit",
      delta_x_to_current_goal: "delta_x_to_deposit",
      delta_z_to_current_goal: "delta_z_to_deposit",
      in_radius_current_goal: "in_radius_deposit",
      last_action_success: "last_deposit_success",
    },
  },

  Open: {
    goalFlag: "goal_is_gate",
    done: (s, stage) => s.gates_open >= getRequiredCount(stage),
    progressFields: ["hasKey", "gates_open"],
    fields: {
      dist_to_current_goal: "dist_to_nearest_gate",
      delta_x_to_current_goal: "delta_x_to_gate",
      delta_z_to_current_goal: "delta_z_to_gate",
      in_radius_current_goal: "in_radius_gate",
      last_action_success: "last_open_success",
    },
  },

  Destroy: {
    goalFlag: "goal_is_destroyable",
    done: (s, stage) => s.items_destroyed >= getRequiredCount(stage),
    progressFields: ["items_destroyed"],
    fields: {
      dist_to_current_goal: "dist_to_nearest_destroyable",
      delta_x_to_current_goal: "delta_x_to_destroyable",
      delta_z_to_current_goal: "delta_z_to_destroyable",
      in_radius_current_goal: "in_radius_destroy",
      last_action_success: "last_destroy_success",
    },
  },

  Find: {
    goalFlag: "goal_is_target",
    done: (s, stage) => s.in_target_radius >= getRequiredCount(stage),
    progressFields: ["in_target_radius"],
    fields: {
      dist_to_current_goal: "dist_to_nearest_target",
      delta_x_to_current_goal: "delta_x_to_target",
      delta_z_to_current_goal: "delta_z_to_target",
      in_radius_current_goal: "in_target_radius",
      last_action_success: null,
    },
  },
};

function hasCapability(capabilities, capabilityName) {
  return capabilities?.some((cap) => cap === capabilityName);
}

function buildProgressFields(behavior) {
  return [
    ...new Set(
      behavior.flatMap((stage) => {
        const type = getStageType(stage);
        return BEHAVIOR_CONFIG[type]?.progressFields ?? [];
      }),
    ),
  ];
}

export function buildBehaviorObsSpace(behavior, capabilities) {
  const goalFlags = behavior
    .map((stage) => {
      const type = getStageType(stage);
      return BEHAVIOR_CONFIG[type]?.goalFlag;
    })
    .filter(Boolean);

  const progressFields = buildProgressFields(behavior);

  const obsSpace = [...BASE_GOAL_FIELDS, ...progressFields, ...goalFlags];

  if (hasCapability(capabilities, "Navigator")) {
    obsSpace.push(...NAVIGATOR_FIELDS);
  }

  return obsSpace;
}

function getStageType(stage) {
  return typeof stage === "string" ? stage : stage?.type;
}

function getRequiredCount(stage) {
  return typeof stage === "object" ? (stage?.requiredCount ?? 1) : 1;
}
