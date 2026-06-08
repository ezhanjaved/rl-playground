import { getIndexOfObs } from "../utility/getIndex";
import { useSceneStore } from "../../stores/useSceneStore";

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
    done: (s) => s.total_items_collected > 0,
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
    done: (s) => s.holding > 0,
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
    done: (s) => s.items_deposited > 0,
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
    done: (s) => s.gates_open > 0,
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
    done: (s) => s.items_destroyed > 0,
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
    done: (s) => s.in_target_radius > 0,
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

function hasCapability(agent, capabilityName) {
  return agent?.capabilities?.some((cap) => cap === capabilityName);
}

function buildProgressFields(behavior) {
  return [
    ...new Set(
      behavior.flatMap((stage) => BEHAVIOR_CONFIG[stage]?.progressFields ?? []),
    ),
  ];
}

function buildBehaviorObsSpace(behavior, agent) {
  const goalFlags = behavior
    .map((stage) => BEHAVIOR_CONFIG[stage]?.goalFlag)
    .filter(Boolean);

  const progressFields = buildProgressFields(behavior);

  const obsSpace = [...BASE_GOAL_FIELDS, ...progressFields, ...goalFlags];

  if (hasCapability(agent, "Navigator")) {
    obsSpace.push(...NAVIGATOR_FIELDS);
  }

  return obsSpace;
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

function pickCurrentBehavior(behavior, state) {
  console.log("State: ", state);
  for (const stage of behavior) {
    const config = BEHAVIOR_CONFIG[stage];
    if (!config) continue;
    console.log("Config: " + config.done);
    if (!config.done(state)) {
      return stage;
    }
  }

  return behavior[behavior.length - 1] ?? "Find";
}

export function BehaviorBuilder(obsVector, agent) {
  const behavior = agent?.behavior;

  const { updateEntityStat } = useSceneStore.getState();
  const observationSpace = agent?.observation_space ?? [];
  const behaviorOBSspace = buildBehaviorObsSpace(behavior, agent);
  const state = getState(obsVector, agent);
  const currentBehavior = pickCurrentBehavior(behavior, state);
  const config = BEHAVIOR_CONFIG[currentBehavior];

  const output = {};

  for (const field of behaviorOBSspace) {
    output[field] = 0;
  }

  const progressFields = buildProgressFields(behavior);

  for (const field of progressFields) {
    output[field] = state[field] ?? 0;
  }

  if (hasCapability(agent, "Navigator")) {
    for (const field of NAVIGATOR_FIELDS) {
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

  const behaviorOBSvector = behaviorOBSspace.map((key) =>
    Number(output[key] ?? 0),
  );

  updateEntityStat(agent?.id, {
    current_behavior: currentBehavior,
    behaviorObs: behaviorOBSspace,
    behaviorObsVector: behaviorOBSvector,
  });

  return {
    currentBehavior,
    behaviorOBSspace,
    behaviorOBSvector,
    behaviorObsObject: output,
  };
}
