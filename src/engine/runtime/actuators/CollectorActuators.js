import { nearbyPickable } from "../../utility/nearByPickable";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function collectorAdapter(action, agent, actionSpace) {
  const { updateEntity, entities, deleteEntity, updateEntityStat } =
    useSceneStore.getState();
  const indexOfAction = getIndexOfObs(actionSpace, action);
  const capabilities = agent.capabilities;
  let newStateSpace = { ...agent.state_space };

  if (capabilities.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;
    if (agent.last_action === action) {
      newStateSpace.last_action_counter += 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  if (action === "collect") {
    const pickRadius = 2.0; //Engine Defined - Not User
    const targetObj = nearbyPickable(
      entities,
      agent.position,
      pickRadius,
      agent.capabilities,
    );

    if (!targetObj) {
      newStateSpace.lastPickSuccess = false;
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      return;
    }

    if (targetObj) {
      console.log("Collecting!");
      const numberOfPickedItems = agent?.state_space?.items_collected;
      const updatedNumber = numberOfPickedItems + 1;
      const updatedTotalNumber = updatedNumber;
      newStateSpace.items_collected = updatedNumber;
      newStateSpace.total_items_collected = updatedTotalNumber;

      newStateSpace.lastPickSuccess = true;
      newStateSpace.lastItemCollected = targetObj.tag;
      if (targetObj.name === "Key") {
        const numberOfKeysPresent = agent?.state_space?.keys_collected;
        const updatedKey = numberOfKeysPresent + 1;
        newStateSpace.keys_collected = updatedKey;
      }
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      updateEntityStat(agent.id, {
        state_space: newStateSpace,
      });
      deleteEntity(targetObj.id); //Remove item from env - it is collected now!
      return;
    }
  }
}
