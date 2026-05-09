import { nearbyPickable } from "../../utility/nearByPickable";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";
export default function collectorAdapter(action, agent, actionSpace) {
  const { updateEntity, entities, deleteEntity } = useSceneStore.getState();
  const indexOfAction = getIndexOfObs(actionSpace, action);
  if (action === "collect") {
    const pickRadius = 1.5; //Engine Defined - Not User
    const targetObj = nearbyPickable(
      entities,
      agent.position,
      pickRadius,
      agent.capabilities,
    );
    console.log("Target Obj: " + targetObj);

    if (!targetObj) {
      updateEntity(agent.id, {
        last_action: action,
        state_space: {
          ...agent.state_space,
          last_action_index: indexOfAction,
          lastPickSuccess: false,
        },
      });
      return;
    }

    if (targetObj) {
      console.log("Collecting!");
      const numberOfPickedItems = agent?.state_space?.items_collected;
      const updatedNumber = numberOfPickedItems + 1;
      updateEntity(agent.id, {
        last_action: action,
        state_space: {
          ...agent.state_space,
          last_action_index: indexOfAction,
          lastItemCollected: targetObj.tag,
          items_collected: updatedNumber,
          lastPickSuccess: true,
        },
      });
      deleteEntity(targetObj.id); //Remove item from env - it is collected now!
      return;
    }
  }
}
