// We will maintain state of Entities, Assignments, Physics Config here
import { create } from "zustand";
import { addCapabilitySchemas } from "../engine/capabilities/registry";

export const useSceneStore = create((set, get) => ({
    entities: {},
    assignments: {},
    models: {},
    physics: { gravity: [0, -9.81, 0], timeStep: 1 / 60, bounds: { xz: 50 }, seed: 1234 },
    activeEntity: null,
    isDragging: false,
    initialized: false,
    bodies: {},
    draftTrainingConfig: {},
    worldMounted: false,
    setWorldMounted: (v) => set({ worldMounted: v }),

    addDraftConfig: (configData) => set({ draftTrainingConfig: configData }),

    addAssignment: (entityId, graphId) => set((state) => {
        if (!entityId) return state;
        if (!graphId) return state;
        return {
            assignments: {
                ...state.assignments,
                [entityId]: {
                    assignedGraphId: graphId,
                    assignedConfig: structuredClone(state.draftTrainingConfig),
                    createdAt: Date.now(),
                }
            }
        }
    }),

    deleteAssignment: (entityId) => set(state => {
        const newAssignments = { ...state.assignments };
        delete newAssignments[entityId];
        return { assignments: newAssignments };
    }),

    setActiveEntity: (entityId) => set({ activeEntity: entityId }),
    setDragging: (dragging) => set({ isDragging: dragging }),

    registerBody: (id, body) => set((state) => {
        console.log("[registerBody called]", id);
        return { bodies: { ...state.bodies, [id]: body } };
    }),

    unregisterBody: (id) => set(state => {
        const existing = { ...state.bodies };
        delete existing[id];
        return { bodies: existing };
    }),

    addEntity: (partial) => set(state => {
        const id = `entity_${crypto.randomUUID() || Date.now()}`;
        const entity = buildEntitiyFromPartial(partial, id);
        return { entities: { ...state.entities, [id]: entity } };
    }),

    addEntityWithId: (id, partial) => set((state) => {
        const entity = buildEntitiyFromPartial(partial, id);
        return { entities: { ...state.entities, [id]: entity } };
    }),

    updateEntity: (id, updated) => set(state => {
        const existing = state.entities[id] || {}; //We used id to get entity details and saved it in existing
        const entity = { ...existing, ...updated }; //We are merging existing entity with updated details
        return { entities: { ...state.entities, [id]: entity } }; //Here we are updating the entities object with new entity details 
    }),

    deleteEntity: (id) => set(state => {
        const newEntities = { ...state.entities }; //Create a copy of existing entities
        // const newBodies = { ...state.bodies };
        // delete newBodies[id];
        delete newEntities[id]; //Delete the entity with given id from the copied object
        return { entities: newEntities }; //Update the state with the new entities object
    }),

    addModels: (id, modelGLTF) => set(state => {
        return { models: { ...state.models, [id]: modelGLTF } }
    }),

    initializeScene: () => {
        const { initialized, addEntity } = get();
        if (initialized) return;

        // addEntity(
        //     {
        //         tag: "non-state",
        //         name: "Bare Tree",
        //         assetRef: "nature/Tree_4_A_Color1.gltf",
        //         isDecor: "true",
        //         position: [2, 0, 2],
        //         collider: { shape: "capsule", h: 3, r: 0.8 }
        //     }
        // ),

        //     addEntity(
        //         {
        //             tag: "non-state",
        //             name: "Bare Tree",
        //             assetRef: "nature/Tree_4_A_Color1.gltf",
        //             isDecor: "true",
        //             position: [6, 0, 2],
        //             collider: { shape: "capsule", h: 3, r: 0.8 }
        //         }
        //     )

        set({ initialized: true });

    }

}));

const buildEntitiyFromPartial = (partial, id) => {
    const type = partial.capabilities || [];
    const { actionSpace, observationsSpace, stateSpace, settingSpace } = addCapabilitySchemas(type);

    let entity = {
        id: id,
        tag: partial.tag || 'generic',
        name: partial.name || `Entity_${id}`,
        capabilities: type,
        position: partial.position || [0, 0, 0],
        rotation: partial.rotation || [0, 0, 0],
        assetRef: partial.assetRef,
        animationRef: partial.animationRef || null,
        collider: partial.collider || null,
        actuator_type: partial.actuator_type || 'walker',

        targetVisual: partial.targetStat || null,
        isDecor: partial.isDecor || false,
        isPickable: partial.isPickable || false,
        isCollectable: partial.isCollectable || false, //This flag can help us to make sure that agent with Collector capability is picking only isCollectable item
        isTarget: partial.isTarget || false,
    }

    if (partial.tag === 'agent') {
        entity['last_action'] = actionSpace.includes('idle') ? 'idle' : null;
        entity['isAssigned'] = false;
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

    if (Object.keys(settingSpace).length > 0) {
        entity['settings'] = settingSpace;
    }

    console.log("Entity created:", entity);
    return entity;
}