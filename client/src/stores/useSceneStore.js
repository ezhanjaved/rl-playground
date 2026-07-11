// We will maintain state of Entities, Assignments, Physics Config here
import { create } from "zustand";
import { addCapabilitySchemas } from "../engine/capabilities/registry";
import * as THREE from "three";
import { highestDistance } from "../engine/utility/highestDistance";
import { useRunTimeStore } from "./useRunTimeStore";
import { buildBehaviorObsSpace } from "../engine/runtime/buildBehaviorOBS";
export const useSceneStore = create((set) => ({
  entities: {},
  entitiesStats: {},
  assignments: {},
  models: {},
  highestDistance: null,
  physics: {
    gravity: [0, -9.81, 0],
    timeStep: 1 / 60,
    bounds: { xz: 50 },
    seed: 1234,
  },
  activeEntity: null,
  isDragging: false,
  initialized: false,
  bodies: {},
  draftTrainingConfig: {},
  worldMounted: false,
  setWorldMounted: (v) => set({ worldMounted: v }),
  envName: null,
  setName: (name) => set({ envName: name }),
  setHighestDistance: (dist) => set({ highestDistance: dist }),
  setEnvName: (name) =>
    set((state) => {
      const envName = name;
      return { entities: { ...state.entities, name: envName } };
    }),

  addDraftConfig: (configData) => set({ draftTrainingConfig: configData }),

  addAssignment: (entityId, graphId) =>
    set((state) => {
      if (!entityId) return state;
      if (!graphId) return state;
      return {
        assignments: {
          ...state.assignments,
          [entityId]: {
            assignedGraphId: graphId,
            assignedConfig: structuredClone(state.draftTrainingConfig),
            createdAt: Date.now(),
          },
        },
      };
    }),

  deleteAssignment: (entityId) =>
    set((state) => {
      const newAssignments = { ...state.assignments };
      delete newAssignments[entityId];
      return { assignments: newAssignments };
    }),

  setActiveEntity: (entityId) => set({ activeEntity: entityId }),
  setDragging: (dragging) => set({ isDragging: dragging }),

  registerBody: (id, body) =>
    set((state) => {
      console.log("[registerBody called]", id);
      return { bodies: { ...state.bodies, [id]: body } };
    }),

  unregisterBody: (id) =>
    set((state) => {
      const existing = { ...state.bodies };
      delete existing[id];
      return { bodies: existing };
    }),

  addEntity: (partial) =>
    set((state) => {
      const id = `entity_${crypto.randomUUID() || Date.now()}`;
      const entity = buildEntitiyFromPartial(partial, id);
      highestDistance();
      if (partial.tag === "agent") {
        useSceneStore.getState().addEntityStat(partial, id);
      }
      return { entities: { ...state.entities, [id]: entity } };
    }),

  addEntityWithId: (id, partial) =>
    set((state) => {
      const entity = buildEntitiyFromPartial(partial, id);
      highestDistance();
      if (partial.tag === "agent") {
        useSceneStore.getState().addEntityStat(partial, id);
      }
      return { entities: { ...state.entities, [id]: entity } };
    }),

  addEntityStat: (partial, id) =>
    set((state) => {
      const entityStat = buildEntityStat(partial);
      return { entitiesStats: { ...state.entitiesStats, [id]: entityStat } };
    }),

  updateEntity: (id, updated) =>
    set((state) => {
      const existing = state.entities[id] || {}; //We used id to get entity details and saved it in existing
      const entity = { ...existing, ...updated }; //We are merging existing entity with updated details
      highestDistance();
      return { entities: { ...state.entities, [id]: entity } }; //Here we are updating the entities object with new entity details
    }),

  updateEntityStat: (id, updated) =>
    set((state) => {
      const existing = state.entitiesStats[id] || {}; //We used id to get entity details and saved it in existing
      const entity = { ...existing, ...updated }; //We are merging existing entity with updated details
      return { entitiesStats: { ...state.entitiesStats, [id]: entity } }; //Here we are updating the entities object with new entity details
    }),

  deleteEntity: (id) =>
    set((state) => {
      const newEntities = { ...state.entities }; //Create a copy of existing entities
      delete newEntities[id]; //Delete the entity with given id from the copied object
      highestDistance();
      useSceneStore.getState().deleteEntityStat(id);
      return { entities: newEntities }; //Update the state with the new entities object
    }),

  deleteEntityStat: (id) =>
    set((state) => {
      const newEntitiesStat = { ...state.entitiesStats }; //Create a copy of existing entities
      delete newEntitiesStat[id]; //Delete the entity with given id from the copied object
      return { entitiesStats: newEntitiesStat }; //Update the state with the new entities object
    }),

  addModels: (id, modelGLTF) =>
    set((state) => {
      return { models: { ...state.models, [id]: modelGLTF } };
    }),
}));

const buildEntityStat = (partial) => {
  const type = partial.capabilities || [];
  const { actionSpace, observationsSpace, stateSpace } =
    addCapabilitySchemas(type);
  const behavior = partial.behavior || [];
  const behaviorObsSpace = buildBehaviorObsSpace(behavior, type);
  let entity = {
    tag: partial.tag,
    capabilities: type,
    seq: 0,
    action_space: actionSpace,
    observation_space: observationsSpace,
    state_space: stateSpace,
    observation_vector: [],
    controller: partial.controller || "random",

    behavior: partial.behavior || [],
    current_behavior: partial.current_behavior || null,
    behaviorObs: behaviorObsSpace || [],
    behaviorObsVector: [],

    last_action: partial.last_action || "idle",
    probabilities: [],
  };
  return entity;
};

const buildEntitiyFromPartial = (partial, id) => {
  const type = partial.capabilities || [];
  const behavior = partial.behavior || [];
  const behaviorObsSpace = buildBehaviorObsSpace(behavior, type);
  const { actionSpace, observationsSpace, stateSpace, settingSpace } =
    addCapabilitySchemas(type);
  const euler = new THREE.Euler(...(partial.rotation || [0, 0, 0]));
  const quat = new THREE.Quaternion().setFromEuler(euler);
  useRunTimeStore.getState().setSeq(id, 0);
  useRunTimeStore.getState().setWaitingForAction(id, false);
  let entity = {
    id: id,
    tag: partial.tag || "generic",
    name: partial.name || `Entity_${id}`,
    capabilities: type,
    position: partial.position || [0, 0, 0],
    rotation: partial.rotation || [0, 0, 0],
    quatRotation: quat ? [quat.x, quat.y, quat.z, quat.w] : [0, 0, 0, 1],
    assetRef: partial.assetRef,
    animationRef: partial.animationRef || null,
    collider: partial.collider || null,
    actuator_type: partial.actuator_type || "walker",
    controller: partial.controller || "random",
    cumulativeShapingReward: null,
    cumulativeTerminalReward: null,
    state: partial.state || {}, //added this will have to sync it on Object Class in python
    positionSpawned: partial.position || [0, 0, 0],

    behavior: behavior || [],
    behaviorObs: behaviorObsSpace || [],
    current_behavior: partial.current_behavior || null,

    goalId: partial.goalId || "",
    teamId: partial.teamId || null,

    targetVisual: partial.targetStat || null,

    isDecor: partial.isDecor || false,
    isGate: partial.isGate || false,
    isBall: partial.isBall || false,
    isGoalPostRed: partial.isGoalPostRed || false,
    isGoalPostBlue: partial.isGoalPostBlue || false,
    isDeposit: partial.isDeposit || false,
    isPickable: partial.isPickable || false,
    isDestroyable: partial.isDestroyable || false,
    isCollectable: partial.isCollectable || false, //This flag can help us to make sure that agent with Collector capability is picking only isCollectable item
    isTarget: partial.isTarget || false,
  };

  if (partial.tag === "agent") {
    entity["last_action"] = actionSpace.includes("idle") ? "idle" : null;
    entity["isAssigned"] = false;
  }

  if (actionSpace.length > 0) {
    entity["action_space"] = actionSpace;
  }

  if (observationsSpace.length > 0) {
    entity["observation_space"] = observationsSpace;
  }

  if (Object.keys(stateSpace).length > 0) {
    entity["state_space"] = stateSpace;
  }

  if (Object.keys(settingSpace).length > 0) {
    entity["settings"] = settingSpace;
  }

  console.log("Entity created:", entity);
  return entity;
};
