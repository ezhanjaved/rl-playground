// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = {
  Moveable: {
    actions: ["move_up", "move_left", "move_right", "idle"],
    observations: ["agent_rotation_y"],
    state: {},
    settings: { speed: 2 },
  },

  TemporalMemory: {
    actions: [],
    observations: ["last_action"],
    state: { last_action_index: 0 },
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
      "lastPickSuccess", // ADD: did last pick attempt succeed or fail?
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
      "items_collected",
      "lastPickSuccess", // ADD
    ],
    state: {
      lastItemCollected: null,
      items_collected: 0,
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
      "items_deposit",
      "last_deposit_success", // ADD: did deposit attempt succeed?
    ],
    state: {
      items_deposited: 0,
      nearDeposit: false,
      lastDepositSuccess: false,
      previous_distance_deposit: Infinity,
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
