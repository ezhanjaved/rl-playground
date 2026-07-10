import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";
export default function openAdapter(action, agent, actionSpace) {
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

  if (action !== "open") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  const info = getNearestTargetInfo(agent.position, entities, "isGate");
  const targetReached = info?.found && info?.distance <= info?.radius;

  if (targetReached) {
    const entityId = info.entityId;
    const dataOfObj = entities[entityId];
    newStateSpace.nearGate = true;
    // it is already open obj
    if (dataOfObj?.state?.isOpen) {
      newStateSpace.lastOpenSuccess = false;
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      return;
    }

    if (newStateSpace.keys_collected > 0) {
      //gate obj is near + it is not already open + open is attempt + key is with agent
      newStateSpace.lastOpenSuccess = true;
      newStateSpace.keys_collected -= 1; //one key is used now

      const current_gate_objs = newStateSpace.gates_open;
      const updated_gate_objs = current_gate_objs + 1;
      newStateSpace.gates_open = updated_gate_objs;

      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });

      updateEntity(dataOfObj.id, {
        assetRef: `resources/arch.gltf`,
        collider: { shape: "box", w: 0.0, h: 0.0, d: 0.0 },
        state: { isOpen: true },
      });

      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      return;
    } else {
      //open was attempted + gate was not open + gate near but no key
      newStateSpace.lastOpenSuccess = false;
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      return;
    }
  }

  //open was attempted but there was none near
  newStateSpace.nearGate = false;
  newStateSpace.lastOpenSuccess = false;
  updateEntity(agent.id, {
    last_action: action,
    state_space: newStateSpace,
  });
  updateEntityStat(agent.id, {
    state_space: newStateSpace,
  });
  return;
}
