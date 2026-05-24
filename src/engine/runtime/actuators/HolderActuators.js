import { nearbyPickable } from "../../utility/nearByPickable";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function holderAdapter(action, entity, actionSpace) {
  const { updateEntity, entities, deleteEntity, addEntity } =
    useSceneStore.getState();
  const freshEntity = entities[entity.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);
  const capabilities = freshEntity.capabilities;
  let newStateSpace = { ...freshEntity.state_space };

  if (capabilities.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;
    if (freshEntity.last_action === action) {
      newStateSpace.last_action_counter += 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  if (action === "pick") {
    const pickRadius = 1.5;
    const targetObj = nearbyPickable(
      entities,
      entity.position,
      pickRadius,
      entity.capabilities,
    );

    // Nothing nearby to pick
    if (!targetObj) {
      newStateSpace.lastPickSuccess = false;
      updateEntity(entity.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      return;
    }

    // Already holding something
    if (freshEntity.state_space.holding) {
      newStateSpace.lastPickSuccess = false;
      updateEntity(entity.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      return;
    }

    // Successful pick
    deleteEntity(targetObj.id);
    console.log("Picking Item");
    newStateSpace.lastPickSuccess = true;
    newStateSpace.holding = true;
    newStateSpace.heldItemAssetRef = targetObj.assetRef;

    updateEntity(entity.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    return;
  }

  if (action === "drop") {
    // Not holding anything
    if (!freshEntity.state_space.holding) {
      newStateSpace.lastPickSuccess = false;
      updateEntity(entity.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      return;
    }

    // Successful drop
    const [wx, wy, wz] = entity.position;
    const droppedObj = {
      tag: "Pickable Object",
      assetRef: freshEntity.state_space.heldItemAssetRef,
      collider: { shape: "capsule", h: 1, r: 0.4 },
      position: [wx + 2, wy, wz + 2],
      isDecor: "false",
      isPickable: "true",
      isCollectable: "false",
    };

    addEntity(droppedObj);
    newStateSpace.lastPickSuccess = false;
    newStateSpace.holding = false;
    newStateSpace.heldItemAssetRef = null;
    updateEntity(entity.id, {
      last_action: action,
      state_space: newStateSpace,
    });
  }
}
