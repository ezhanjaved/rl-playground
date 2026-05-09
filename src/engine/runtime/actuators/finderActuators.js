import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function finderAdapter(action, agent, actionSpace) {
  const { updateEntity, entities } = useSceneStore.getState();
  const freshAgent = entities[agent.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);

  if (action !== "interact") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: {
        ...freshAgent.state_space,
        last_action_index: indexOfAction,
      },
    });
    return;
  }

  const info = getNearestTargetInfo(agent.position, entities, "isTarget");
  const targetReached = info?.found && info?.distance <= info?.radius;
  console.log("Target Reached: " + targetReached);

  updateEntity(agent.id, {
    last_action: action,
    state_space: {
      ...freshAgent.state_space,
      last_action_index: indexOfAction,
      targetReached,
    },
  });
}
