import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function finderAdapter(action, agent, actionSpace) {
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

  if (action !== "interact") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  const info = getNearestTargetInfo(agent.position, entities, "isTarget");
  const targetReached = info?.found && info?.distance <= info?.radius;
  newStateSpace.targetReached = targetReached;

  updateEntity(agent.id, {
    last_action: action,
    state_space: newStateSpace,
  });
  updateEntityStat(agent.id, {
    state_space: newStateSpace,
  });
}
