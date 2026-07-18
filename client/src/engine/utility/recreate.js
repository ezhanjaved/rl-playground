import { useSceneStore } from "../../stores/useSceneStore";
export function recreateEnv(entities) {
  const objects = Object.keys(entities);
  const { addEntityWithId } = useSceneStore.getState();

  objects.forEach((singleKey) => {
    const singleObj = entities[singleKey];
    const newEnt = {
      tag: singleObj.tag,
      name: singleObj.name,
      capabilities: singleObj?.capabilities || [],
      position: singleObj.position,
      rotation: singleObj.rotation,
      quatRotation: singleObj?.quatRotation || [0, 0, 0, 1],
      assetRef: singleObj.assetRef,
      animationRef: singleObj.animationRef,
      collider: singleObj.collider,
      actuator_type: singleObj.actuator_type,
      controller: singleObj.controller || null,
      positionSpawned: singleObj.positionSpawned || [0, 0, 0],
      state: singleObj.state || {},

      behavior: singleObj.behavior || [],
      behaviorObs: singleObj.behaviorObs || [],
      current_behavior: singleObj.current_behavior || null,

      goalId: singleObj.goalId || "",
      teamId: singleObj.teamId || null,
      oppTeamId: singleObj.oppTeamId || null,

      isDecor: singleObj.isDecor,
      isPickable: singleObj.isPickable,
      isCollectable: singleObj.isCollectable,
      isTarget: singleObj.isTarget,
      isGate: singleObj.isGate,
      isBall: singleObj.isBall,
      isGoalPostRed: singleObj.isGoalPostRed,
      isGoalPostBlue: singleObj.isGoalPostBlue,
      isGoalPostYellow: singleObj.isGoalPostYellow || false,
      isGoalPostGreen: singleObj.isGoalPostGreen || false,
      isDeposit: singleObj.isDeposit,
      isDestroyable: singleObj.isDestroyable,

      last_action: singleObj?.last_action || null,
      isAssigned: singleObj.isAssigned,
      action_space: singleObj?.action_space || [],
      observation_space: singleObj?.observation_space || [],
      state_space: singleObj?.state_space || {},
      settings: singleObj.settings || {},
    };
    addEntityWithId(singleKey, newEnt);
  });
}

export function wipeEntities() {
  const { deleteEntity, entities } = useSceneStore.getState();
  const objects = Object.keys(entities);
  objects.forEach((key) => {
    deleteEntity(key);
  });
}
