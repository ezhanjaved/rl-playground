// Capability schemas (actions, obs fields, state keys)
export const CAPABILITY_SCHEMAS = { 
    Moveable: {
        actions: ['move_up', 'move_down', 'move_left', 'move_right', 'idle'],
        observations : ['self_position_x', 'self_position_y', 'self_position_z'],
    },

    Interactable: {
        actions: ['interact'],
        observations : ['last_action', 'dist_to_object'],
    },

    Toggleble : {
        state: {on: 'bool'}
    }
};

export const addCapabilitySchemas = (type) => {
    //type will be an array containing capability types
    // ['Moveable', 'Interactable']
    let actionSpace = [];
    let observationsSpace = [];
    let stateSpace = {};
    type.forEach(element => {
       actionSpace = actionSpace.concat(CAPABILITY_SCHEMAS[element].actions || []);
       observationsSpace = observationsSpace.concat(CAPABILITY_SCHEMAS[element].observations || []);
       stateSpace = {...stateSpace, ...(CAPABILITY_SCHEMAS[element].state || {})};
    });
    
    return {actionSpace, observationsSpace, stateSpace};
}