import { useSceneStore } from "../../stores/useSceneStore";
export function recreateEnv(entities) {
  const objects = Object.keys(entities);
  const { addEntity } = useSceneStore.getState();

  objects.forEach((singleKey) => {
    const singleObj = entities[singleKey];
    const newEnt = {
      tag: singleObj.tag,
      name: singleObj.name,
      capabilities: singleObj?.capabilities || [],
      position: singleObj.position,
      rotation: singleObj.rotation,
      assetRef: singleObj.assetRef,
      animationRef: singleObj.animationRef,
      collider: singleObj.collider,
      actuator_type: singleObj.actuator_type,
      isDecor: singleObj.isDecor,
      isPickable: singleObj.isPickable,
      isCollectable: singleObj.isCollectable,
      isTarget: singleObj.isTarget,
      last_action: singleObj?.last_action || null,
      isAssigned: singleObj.isAssigned,
      action_space: singleObj?.action_space || [],
      observation_space: singleObj?.observation_space || [],
      state_space: singleObj?.state_space || {},
      settings: singleObj.settings || {},
    };
    addEntity(newEnt);
  });
}

export function wipeEntities() {
  const { deleteEntity, entities } = useSceneStore.getState();
  const objects = Object.keys(entities);
  objects.forEach((key) => {
    deleteEntity(key);
  });
}
