// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = { 
    Moveable: {
        actions: ['move_up', 'move_down', 'move_left', 'move_right', 'idle'],
        observations : ['self_position_x', 'self_position_y', 'self_position_z', 'dist_to_nearest_target'],
        settings: {speed: 0.5}
    },

    Holder : {
        actions: ['pick', 'drop'], //An agent with holder capability can both pick and drop - this is for carrying stuff
        observations: ['holding', 'dist_to_nearest_pickable'],
        state: {holding: false, heldItemAssetRef: null, lastPickSuccess: null},
    },

    Collector: {
        actions: ['collect'], //An agent with collector capability will only be able to pick and his state will reflect the number of items collected
        observations: ['dist_to_nearest_collectable', 'items_collected'],
        state: {lastItemCollected: null, items_collected: 0, lastPickSuccess: null},
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
       stateSpace = {...stateSpace, ...(CAPABILITY_SCHEMAS[element].state || {})};
       settingSpace = {...settingSpace, ...(CAPABILITY_SCHEMAS[element].settings || {})};
    });
    
    return {actionSpace, observationsSpace, stateSpace, settingSpace};
}