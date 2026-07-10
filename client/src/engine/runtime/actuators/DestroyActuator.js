import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";
export default function destoryAdapter(action, agent, actionSpace) {
  const { updateEntity, entities, updateEntityStat } = useSceneStore.getState();
  const freshAgent = entities[agent.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);
  const capabilities = freshAgent.capabilities;
  let newStateSpace = { ...freshAgent.state_space };

  if (capabilities.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;
    if (freshAgent.last_action === action) {
      newStateSpace.last_action_counter += 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  if (action !== "destroy") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  console.log("Destroy!");
  const info = getNearestTargetInfo(agent.position, entities, "isDestroyable");
  const targetReached = info?.found && info?.distance <= info?.radius;
  const entity_name = info.entityName;

  if (targetReached) {
    console.log("TR Hit");
    const entityId = info.entityId;
    const dataOfObj = entities[entityId];
    newStateSpace.nearDestroyable = true;
    // it is already destroyed obj
    if (dataOfObj?.state?.isDestroyed) {
      newStateSpace.lastDestroySuccess = false;
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      return;
    }

    //destory obj is near + it is not already destroyed + destroy is attempt
    newStateSpace.lastDestroySuccess = true;

    const current_destroyed_objs = newStateSpace.items_destroyed;
    const updated_destroyed_objs = current_destroyed_objs + 1;
    newStateSpace.items_destroyed = updated_destroyed_objs;

    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });

    updateEntity(dataOfObj.id, {
      assetRef: `resources/${entity_name}_small.gltf`,
      collider: { shape: "box", w: 0.0, h: 0.0, d: 0.0 },
      state: { isDestroyed: true },
    });

    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });

    return;
  }

  //destroy was attempted but there was none near
  newStateSpace.nearDestroyable = false;
  newStateSpace.lastDestroySuccess = false;
  console.log("Hitting here");
  updateEntity(agent.id, {
    last_action: action,
    state_space: newStateSpace,
  });
  updateEntityStat(agent.id, {
    state_space: newStateSpace,
  });
  return;
}
