// We will maintain state of Entities, Assignments, Physics Config here
import { create } from "zustand";
import { addCapabilitySchemas } from "../engine/capabilities/registry";

export const useSceneStore = create((set, get) => ({
    entities: {},
    assignments: {},
    physics: {gravity: [0, -9.81, 0], timeStep: 1/60, bounds: {xz:50}, seed: 1234},
    activeEntity : null,
    isDragging: false,
    initialized: false,

    setActiveEntity: (entityId) => set({activeEntity: entityId}),
    setDragging: (dragging) => set({isDragging: dragging}),
    
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

    initializeScene: () => {
        const {initialized, addEntity} = get();
        if (initialized) return;

        addEntity(
            {
                tag: "non-state",
                assetRef: "nature/Tree_2_A_Color1.gltf",
                isDecor: "true",
                position: [2,0,2],
            }   
        ),

        addEntity(
            {
                tag: "non-state",
                assetRef: "nature/Tree_2_A_Color1.gltf",
                isDecor: "true",
                position: [6,0,2],
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
        assetRef: partial.assetRef,
        animationRef: partial.animationRef || null,
        collider: partial.collider || { shape: 'capsule', r: 0.3, h: 1.2},
        actuator_type : partial.actuator_type || 'walker',
        isDecor: partial.isDecor || false,
    }

    if (partial.tag === 'agent') {
        entity['last_action'] = null;
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