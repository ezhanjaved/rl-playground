// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = {
    Moveable: {
        actions: ['move_up', 'move_down', 'move_left', 'move_right', 'idle'],
        observations: ['dist_x_to_target', "dist_z_to_target", "dist_to_nearest_target"], //We can use previous_dist to calculate change in each step
        state: { targetReached: false, previous_distance_target: 0 }, //use change to aid agent to show going close is rewarding
        settings: { speed: 5 }
    },

    Holder: {
        actions: ['pick', 'drop'], //An agent with holder capability can both pick and drop - this is for carrying stuff
        observations: ['dist_x_to_pickable', 'dist_z_to_pickable' ,'dist_to_nearest_pickable', 'holding'],
        state: { holding: false, heldItemAssetRef: null, lastPickSuccess: null, previous_distance_pickable: 0 },
    },

    Collector: {
        actions: ['collect'], //An agent with collector capability will only be able to pick and his state will reflect the number of items collected
        observations: ['dist_x_to_collect','dist_z_to_collect','dist_to_nearest_collectable', 'items_collected'],
        state: { lastItemCollected: null, items_collected: 0, lastPickSuccess: null, previous_distance_collect: 0 },
    },
};

export const addCapabilitySchemas = (type) => {
    let actionSpace = [];
    let observationsSpace = [];
    let stateSpace = {};
    let settingSpace = {};
    type.forEach(element => {
        actionSpace = actionSpace.concat(CAPABILITY_SCHEMAS[element].actions || []);
        observationsSpace = observationsSpace.concat(CAPABILITY_SCHEMAS[element].observations || []);
        stateSpace = { ...stateSpace, ...(CAPABILITY_SCHEMAS[element].state || {}) };
        settingSpace = { ...settingSpace, ...(CAPABILITY_SCHEMAS[element].settings || {}) };
    });

    return { actionSpace, observationsSpace, stateSpace, settingSpace };
}