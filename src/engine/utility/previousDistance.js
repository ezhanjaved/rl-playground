import { useSceneStore } from "../../stores/useSceneStore";
import { getIndexOfObs } from "./getIndex";
import { convertRot } from "./rotationCal";
export default function previousDistanceCorrection(
  obs_space,
  agent,
  last_action,
  position,
  rotation,
) {
  const capabilities = agent?.capabilities; //["Moveable", "Finder"]
  const { updateEntity } = useSceneStore.getState();
  let index = null;
  let value = null;
  let newStateSpace = { ...agent.state_space };

  capabilities.forEach((cap) => {
    switch (cap) {
      case "Finder":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_target",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_target = value;
        break;

      case "Holder":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_pickable",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_pickable = value;
        break;

      case "Collector":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_collectable",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_collect = value;
        break;

      case "Depositor":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_deposit",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_deposit = value;
        break;

      case "Navigator":
        break;
    }
  });

  const quat = convertRot(rotation);
  updateEntity(agent.id, {
    last_action,
    position,
    rotation,
    quatRotation: quat ? [quat.x, quat.y, quat.z, quat.w] : [0, 0, 0, 1],
    state_space: newStateSpace,
  });
}
