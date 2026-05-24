import { nearbyPickable } from "../../utility/nearByPickable";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";
export default function collectorAdapter(action, agent, actionSpace) {
  const { updateEntity, entities, deleteEntity } = useSceneStore.getState();
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
    const pickRadius = 1.5; //Engine Defined - Not User
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
      return;
    }

    if (targetObj) {
      console.log("Collecting!");
      const numberOfPickedItems = agent?.state_space?.items_collected;
      const updatedNumber = numberOfPickedItems + 1;
      newStateSpace.items_collected = updatedNumber;
      newStateSpace.lastPickSuccess = true;
      newStateSpace.lastItemCollected = targetObj.tag;
      updateEntity(agent.id, {
        last_action: action,
        state_space: newStateSpace,
      });
      deleteEntity(targetObj.id); //Remove item from env - it is collected now!
      return;
    }
  }
}
