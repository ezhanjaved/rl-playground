// We will maintain state of Entities, Assignments, Physics Config here
import { create } from "zustand";
import { addCapabilitySchemas } from "../engine/capabilities/registry";

export const useSceneStore = create((set, get) => ({
    entities: {},
    assignments: {},
    models: {},
    physics: {gravity: [0, -9.81, 0], timeStep: 1/60, bounds: {xz:50}, seed: 1234},
    activeEntity : null,
    isDragging: false,
    initialized: false,
    bodies: {},

    setActiveEntity: (entityId) => set({activeEntity: entityId}),
    setDragging: (dragging) => set({isDragging: dragging}),

    registerBody: (id, body) => set((state) => ({
        bodies : {...state.bodies, [id]: body },
    })),

    unregisterBody: (id) => set (state => {
        const existing = {...state.bodies};
        delete existing[id];
        return {bodies: existing}; 
    }),

    addEntity: (partial) => set (state => {
        const id = `entity_${crypto.randomUUID() || Date.now()}`; 
        const entity = buildEntitiyFromPartial(partial, id);
        return { entities: {...state.entities, [id]: entity} };
    }),

    updateEntity: (id, updated) => set (state => {
        const existing = state.entities[id] || {}; //We used id to get entity details and saved it in existing
        const entity = {...existing, ...updated}; //We are merging existing entity with updated details
        return {entities: {...state.entities, [id]: entity}}; //Here we are updating the entities object with new entity details 
    }),

    deleteEntity: (id) => set (state => {
        const newEntities = {...state.entities}; //Create a copy of existing entities
        delete newEntities[id]; //Delete the entity with given id from the copied object
        return {entities: newEntities}; //Update the state with the new entities object
    }),

    addModels: (id, modelGLTF) => set (state => {
       return {models : {...state.models, [id]: modelGLTF }}
    }),

    initializeScene: () => {
        const {initialized, addEntity} = get();
        if (initialized) return;

        addEntity(
            {
                tag: "non-state",
                assetRef: "nature/Tree_4_A_Color1.gltf",
                isDecor: "true",
                position: [2,0,2],
                collider: {shape: "capsule", h: 3, r: 0.8}
            }   
        ),

        addEntity(
            {
                tag: "non-state",
                assetRef: "nature/Tree_4_A_Color1.gltf",
                isDecor: "true",
                position: [6,0,2],
                collider: {shape: "capsule", h: 3, r: 0.8}
            }   
        )

        set({initialized: true});

    }

}));

const buildEntitiyFromPartial = (partial, id) => {
    const type = partial.capabilities || [];
    const {actionSpace, observationsSpace, stateSpace} = addCapabilitySchemas(type);
    
    let entity = {
        id: id,
        tag: partial.tag || 'generic',
        name: partial.name || `Entity_${id}`,
        capabilities: type,
        position: partial.position || [0,0,0],
        rotation: partial.rotation || [0,0,0],
        assetRef: partial.assetRef,
        animationRef: partial.animationRef || null,
        collider: partial.collider || null,
        actuator_type : partial.actuator_type || 'walker',
        isDecor: partial.isDecor || false,
        isPickable: partial.isPickable || false,
    }

    if (partial.tag === 'agent') {
        entity['last_action'] = actionSpace.includes('idle') ? 'idle' : null;
    }

    if (actionSpace.length > 0) {
        entity['action_space'] = actionSpace;
    }

    if (observationsSpace.length > 0) {
        entity['observation_space'] = observationsSpace;
    }

    if (Object.keys(stateSpace).length > 0) {
        entity['state_space'] = stateSpace;
    }

    console.log("Entity created:", entity);
    return entity;
}