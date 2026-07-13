// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = {
  Moveable: {
    actions: ["move_up", "move_left", "move_right", "idle"],
    observations: [],
    state: {},
    settings: { speed: 4 },
  },

  TemporalMemory: {
    actions: [],
    observations: ["last_action", "last_action_counter"],
    state: { last_action_index: 0, last_action_counter: 0 },
  },

  Navigator: {
    actions: [],
    observations: [
      "obstacle_forward",
      "obstacle_left",
      "obstacle_right",
      "obstacle_in_path",
    ],
    state: {},
  },

  Finder: {
    actions: ["interact"],
    observations: [
      "dist_to_nearest_target",
      "delta_x_to_target",
      "delta_z_to_target",
      "in_target_radius",
    ],
    state: {
      targetReached: false,
      previous_distance_target: Infinity,
    }, //memory
  },

  Holder: {
    actions: ["pick", "drop"], //An agent with holder capability can both pick and drop - this is for carrying stuff
    observations: [
      "dist_to_nearest_pickable",
      "delta_x_to_pickable",
      "delta_z_to_pickable",
      "holding",
      "in_radius_holder",
      "lastPickSuccess",
    ],
    state: {
      holding: false,
      heldItemAssetRef: null,
      lastPickSuccess: null,
      previous_distance_pickable: Infinity,
    },
  },

  Collector: {
    actions: ["collect"], //An agent with collector capability will only be able to pick and his state will reflect the number of items collected
    observations: [
      "dist_to_nearest_collectable",
      "delta_x_to_collectable",
      "delta_z_to_collectable",
      "in_radius_collect",
      "items_collected",
      "keys_collected",
      "total_items_collected",
      "lastPickSuccess",
    ],
    state: {
      lastItemCollected: null,
      items_collected: 0,
      keys_collected: 0,
      total_items_collected: 0,
      lastPickSuccess: null,
      previous_distance_collect: Infinity,
    },
  },

  Depositor: {
    actions: ["deposit"], //An agent with deposit ability should always be paired with either collector/holder
    observations: [
      "dist_to_nearest_deposit",
      "delta_x_to_deposit",
      "delta_z_to_deposit",
      "items_deposited",
      "in_radius_deposit",
      "last_deposit_success",
    ],
    state: {
      items_deposited: 0,
      nearDeposit: false,
      lastDepositSuccess: false,
      previous_distance_deposit: Infinity,
    },
  },

  Destroyer: {
    actions: ["destroy"],
    observations: [
      "dist_to_nearest_destroyable",
      "delta_x_to_destroyable",
      "delta_z_to_destroyable",
      "in_radius_destroyed",
      "items_destroyed",
      "last_destroy_success",
    ],
    state: {
      items_destroyed: 0,
      nearDestroyable: false,
      lastDestroySuccess: false,
      previous_distance_destroyable: Infinity,
    },
  },

  Opener: {
    actions: ["open"],
    observations: [
      "dist_to_nearest_gate",
      "delta_x_to_gate",
      "delta_z_to_gate",
      "in_radius_gate",
      "gates_open",
      "hasKey",
      "last_open_success",
    ],
    state: {
      gates_open: 0,
      nearGate: false,
      lastOpenSuccess: false,
      previous_distance_gate: Infinity,
    },
  },

  Footballer: {
    actions: ["kick"],
    observations: [
      "dist_to_nearest_ball",
      "delta_x_to_ball",
      "delta_z_to_ball",
      "in_radius_ball",

      "dist_to_target_goal",
      "delta_x_to_goal",
      "delta_z_to_goal",
      "in_radius_goal",
      "alignment_to_goal",
      "ball_dist_to_enemy_goal",

      "last_kick_success",

      // "ball_dist_to_own_goal",
      // "ball_in_own_goal_danger_zone",

      "my_goals_scored",
      "my_own_goals_scored",
      "team_goals_scored",
      "team_goals_conceded",
      "last_goal_type",
    ],
    state: {
      team_goals_scored: 0,
      team_goals_conceded: 0,
      my_goals_scored: 0,
      my_own_goals_scored: 0,
      last_goal_type: null,
      lastKickSuccess: false,
      previous_distance_ball: Infinity,
      previous_distance_goal: Infinity,
    },
  },
};

export const addCapabilitySchemas = (type) => {
  let actionSpace = [];
  let observationsSpace = [];
  let stateSpace = {};
  let settingSpace = {};
  type.forEach((element) => {
    actionSpace = actionSpace.concat(CAPABILITY_SCHEMAS[element].actions || []);
    observationsSpace = observationsSpace.concat(
      CAPABILITY_SCHEMAS[element].observations || [],
    );
    stateSpace = {
      ...stateSpace,
      ...(CAPABILITY_SCHEMAS[element].state || {}),
    };
    settingSpace = {
      ...settingSpace,
      ...(CAPABILITY_SCHEMAS[element].settings || {}),
    };
  });

  return { actionSpace, observationsSpace, stateSpace, settingSpace };
};
