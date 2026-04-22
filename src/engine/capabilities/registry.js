// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = {
  Moveable: {
    actions: ["move_up", "move_down", "move_left", "move_right", "idle"],
    observations: ["agent_pos_x", "agent_pos_z", "agent_rotation_y"],
    state: {},
    settings: { speed: 2 },
  },

  Navigator: {
    actions: [],
    observations: [
      "dist_x_to_obstacle",
      "dist_z_to_obstacle",
      "dist_to_nearest_obstacle",
      "obstacle_in_path", //obstacle hai yah nahi
    ],
    state: {
      previous_distance_obstacle: Infinity,
      previous_distance_obstacle_x: Infinity,
      previous_distance_obstacle_z: Infinity,
    },
  },

  Finder: {
    actions: ["interact"],
    observations: [
      "dist_x_to_target",
      "dist_z_to_target",
      "dist_to_nearest_target",
      "in_target_radius",
    ],
    state: {
      targetReached: false,
      previous_distance_target: Infinity,
      previous_distance_target_x: Infinity,
      previous_distance_target_z: Infinity,
    }, //memory
  },

  Holder: {
    actions: ["pick", "drop"], //An agent with holder capability can both pick and drop - this is for carrying stuff
    observations: [
      "dist_x_to_pickable",
      "dist_z_to_pickable",
      "dist_to_nearest_pickable",
      "holding",
    ],
    state: {
      holding: false,
      heldItemAssetRef: null,
      lastPickSuccess: null,
      previous_distance_pickable: Infinity,
      previous_distance_pickable_x: Infinity,
      previous_distance_pickable_z: Infinity,
    },
  },

  Collector: {
    actions: ["collect"], //An agent with collector capability will only be able to pick and his state will reflect the number of items collected
    observations: [
      "dist_x_to_collect",
      "dist_z_to_collect",
      "dist_to_nearest_collectable",
      "items_collected",
    ],
    state: {
      lastItemCollected: null,
      items_collected: 0,
      lastPickSuccess: null,
      previous_distance_collect: Infinity,
      previous_distance_collect_x: Infinity,
      previous_distance_collect_z: Infinity,
    },
  },

  Depositor: {
    actions: ["deposit"], //An agent with deposit ability should always be paired with either collector/holder
    observations: [
      "dist_x_to_deposit",
      "dist_z_to_deposit",
      "dist_to_nearest_deposit",
      "items_deposit",
    ],
    state: {
      lastItemCollected: null,
      items_deposited: 0,
      nearDeposit: false,
      lastPickSuccess: null,
      previous_distance_deposit: Infinity,
      previous_distance_deposit_x: Infinity,
      previous_distance_deposit_z: Infinity,
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
