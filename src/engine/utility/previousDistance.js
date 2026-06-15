import { useSceneStore } from "../../stores/useSceneStore";
import { getIndexOfObs } from "./getIndex";
import { convertRot } from "./rotationCal";

const PREVIOUS_DISTANCE_BY_BEHAVIOR = {
  Find: "previous_distance_target",
  Collect: "previous_distance_collect",
  Holding: "previous_distance_pickable",
  Deposit: "previous_distance_deposit",
  Destroy: "previous_distance_destroyable",
  Open: "previous_distance_gate",
};

export default function previousDistanceCorrection(
  behaviorOBSvector,
  agent,
  current_action,
  position,
  rotation,
) {
  const { updateEntity, entities, updateEntityStat } = useSceneStore.getState();
  const freshAgent = entities[agent.id];

  const behaviorOBSspace = freshAgent.behaviorObs;
  const currentBehavior = freshAgent.current_behavior;

  let newStateSpace = { ...agent.state_space };

  const action_space = agent?.action_space ?? [];
  const indexOfAction = getIndexOfObs(action_space, current_action);

  const distIndex = getIndexOfObs(behaviorOBSspace, "dist_to_current_goal");

  const currentGoalDistance =
    distIndex === -1 ? null : behaviorOBSvector[distIndex];

  const previousDistanceKey = PREVIOUS_DISTANCE_BY_BEHAVIOR[currentBehavior];

  if (
    previousDistanceKey &&
    currentGoalDistance !== null &&
    currentGoalDistance !== undefined
  ) {
    const best = newStateSpace[previousDistanceKey] ?? Infinity;

    if (currentGoalDistance < best) {
      newStateSpace[previousDistanceKey] = currentGoalDistance;
    }
  }

  if (agent?.capabilities?.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;

    if (current_action === agent.last_action) {
      newStateSpace.last_action_counter =
        (newStateSpace.last_action_counter ?? 0) + 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  const quat = convertRot(rotation);

  updateEntity(agent.id, {
    last_action: current_action,
    position,
    rotation,
    quatRotation: quat ? [quat.x, quat.y, quat.z, quat.w] : [0, 0, 0, 1],
    state_space: newStateSpace,
  });
  updateEntityStat(agent.id, {
    state_space: newStateSpace,
  });
}
