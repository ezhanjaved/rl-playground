import { nearbyPickable } from "../../utility/nearByPickable";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function holderAdapter(action, entity, actionSpace) {
  const { updateEntity, entities, deleteEntity, addEntity } =
    useSceneStore.getState();
  const freshEntity = entities[entity.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);

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
      updateEntity(entity.id, {
        last_action: action,
        state_space: {
          ...freshEntity.state_space,
          last_action_index: indexOfAction,
          lastPickSuccess: false,
        },
      });
      return;
    }

    // Already holding something
    if (freshEntity.state_space.holding) {
      updateEntity(entity.id, {
        last_action: action,
        state_space: {
          ...freshEntity.state_space,
          last_action_index: indexOfAction,
          lastPickSuccess: false,
        },
      });
      return;
    }

    // Successful pick
    deleteEntity(targetObj.id);
    console.log("Picking Item");
    updateEntity(entity.id, {
      last_action: action,
      state_space: {
        ...freshEntity.state_space,
        last_action_index: indexOfAction,
        holding: true,
        heldItemAssetRef: targetObj.assetRef,
        lastPickSuccess: true,
      },
    });
    return;
  }

  if (action === "drop") {
    // Not holding anything
    if (!freshEntity.state_space.holding) {
      updateEntity(entity.id, {
        last_action: action,
        state_space: {
          ...freshEntity.state_space,
          last_action_index: indexOfAction,
          lastPickSuccess: false,
        },
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
    updateEntity(entity.id, {
      last_action: action,
      state_space: {
        ...freshEntity.state_space,
        last_action_index: indexOfAction,
        holding: false,
        heldItemAssetRef: null,
        lastPickSuccess: false,
      },
    });
  }
}
