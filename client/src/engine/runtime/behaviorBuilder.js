import { getIndexOfObs } from "../utility/getIndex";
import { useSceneStore } from "../../stores/useSceneStore";

const NAVIGATOR_FIELDS = [
  "obstacle_forward",
  "obstacle_left",
  "obstacle_right",
  "obstacle_in_path",
];

const FOOTBALL_FIELDS = [
  "dist_to_target_goal",
  "delta_x_to_goal",
  "delta_z_to_goal",
  "in_radius_goal",
  "alignment_to_goal",
  "ball_dist_to_enemy_goal",
  // "ball_dist_to_own_goal",
  // "ball_in_own_goal_danger_zone",
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
  "my_goals_scored",
  "team_goals_scored",
  "team_goals_conceded",
  "my_own_goals_scored",
  "last_goal_type",
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
      in_radius_current_goal: "in_radius_destroyed",
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

  Football: {
    goalFlag: "goal_is_football",
    done: (s, stage) => s.team_goals_scored >= getRequiredCount(stage),
    progressFields: [
      "team_goals_scored",
      "my_goals_scored",
      "team_goals_conceded",
      "my_own_goals_scored",
      "last_goal_type",
    ],
    fields: {
      dist_to_current_goal: "dist_to_nearest_ball",
      delta_x_to_current_goal: "delta_x_to_ball",
      delta_z_to_current_goal: "delta_z_to_ball",
      in_radius_current_goal: "in_radius_ball",
      last_action_success: "last_kick_success",
    },
  },
};

function hasCapability(capabilities, capabilityName) {
  return capabilities.some((cap) => cap === capabilityName);
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

function buildBehaviorObsSpace(behavior, capabilities) {
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

  if (hasCapability(capabilities, "Footballer")) {
    obsSpace.push(...FOOTBALL_FIELDS);
  }

  return obsSpace;
}

function pickCurrentBehavior(behavior, state) {
  for (const stage of behavior) {
    const type = getStageType(stage);
    const config = BEHAVIOR_CONFIG[type];
    if (!config) continue;

    if (!config.done(state, stage)) {
      return type;
    }
  }

  const lastStage = behavior[behavior.length - 1];
  return getStageType(lastStage) ?? "Find";
}

function getObsValue(observationSpace, obsVector, obsName, defaultValue = 0) {
  const index = getIndexOfObs(observationSpace, obsName);

  if (index === -1) return defaultValue;

  return Number(obsVector[index] ?? defaultValue);
}

function getState(obsVector, agent) {
  const observationSpace = agent?.observation_space ?? [];
  const stateObj = {};

  for (const progressIndicator of PROGRESS_FIELDS) {
    stateObj[progressIndicator] = getObsValue(
      observationSpace,
      obsVector,
      progressIndicator,
      0,
    );
  }

  return stateObj;
}

function getStageType(stage) {
  return typeof stage === "string" ? stage : stage?.type;
}

function getRequiredCount(stage) {
  return typeof stage === "object" ? (stage?.requiredCount ?? 10) / 10.0 : 1;
}

export function BehaviorBuilder(obsVector, agent) {
  const behavior = agent?.behavior;
  const capabilities = agent?.capabilities;
  const { updateEntityStat, updateEntity } = useSceneStore.getState();
  const observationSpace = agent?.observation_space ?? [];
  const behavior_obs_space =
    agent?.behaviorObs ?? buildBehaviorObsSpace(behavior, capabilities) ?? [];

  const state = getState(obsVector, agent);
  const currentBehavior = pickCurrentBehavior(behavior, state);
  const config = BEHAVIOR_CONFIG[currentBehavior];

  const output = {};

  for (const field of behavior_obs_space) {
    output[field] = 0;
  }

  const progressFields = buildProgressFields(behavior);

  for (const field of progressFields) {
    output[field] = state[field] ?? 0;
  }

  if (hasCapability(capabilities, "Navigator")) {
    for (const field of NAVIGATOR_FIELDS) {
      output[field] = getObsValue(observationSpace, obsVector, field, 0);
    }
  }

  if (hasCapability(capabilities, "Footballer")) {
    for (const field of FOOTBALL_FIELDS) {
      output[field] = getObsValue(observationSpace, obsVector, field, 0);
    }
  }

  if (config?.fields) {
    for (const [behaviorField, rawField] of Object.entries(config.fields)) {
      output[behaviorField] =
        rawField === null
          ? 0
          : getObsValue(observationSpace, obsVector, rawField, 0);
    }
  }

  if (config?.goalFlag) {
    output[config.goalFlag] = 1;
  }

  const behaviorOBSvector = behavior_obs_space.map((key) =>
    Number(output[key] ?? 0),
  );

  updateEntityStat(agent?.id, {
    current_behavior: currentBehavior,
    behaviorObsVector: behaviorOBSvector,
  });

  updateEntity(agent?.id, {
    current_behavior: currentBehavior,
  });

  return {
    currentBehavior,
    behaviorOBSvector,
    behaviorOBSspace: behavior_obs_space,
    behaviorObsObject: output,
  };
}
