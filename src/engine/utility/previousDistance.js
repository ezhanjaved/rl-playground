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

        // index = getIndexOfObs(agent?.observation_space, "dist_x_to_target");
        // value = obs_space[index];
        // newStateSpace.previous_distance_target_x = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_z_to_target");
        // value = obs_space[index];
        // newStateSpace.previous_distance_target_z = value;

        break;

      case "Holder":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_pickable",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_pickable = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_x_to_pickable");
        // value = obs_space[index];
        // newStateSpace.previous_distance_pickable_x = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_z_to_pickable");
        // value = obs_space[index];
        // newStateSpace.previous_distance_pickable_z = value;

        break;

      case "Collector":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_collectable",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_collect = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_x_to_collect");
        // value = obs_space[index];
        // newStateSpace.previous_distance_collect_x = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_z_to_collect");
        // value = obs_space[index];
        // newStateSpace.previous_distance_collect_z = value;

        break;

      case "Depositor":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_deposit",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_deposit = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_x_to_deposit");
        // value = obs_space[index];
        // newStateSpace.previous_distance_deposit_x = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_z_to_deposit");
        // value = obs_space[index];
        // newStateSpace.previous_distance_deposit_z = value;

        break;

      case "Navigator":
        index = getIndexOfObs(
          agent?.observation_space,
          "dist_to_nearest_obstacle",
        );
        value = obs_space[index];
        newStateSpace.previous_distance_obstacle = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_x_to_obstacle");
        // value = obs_space[index];
        // newStateSpace.previous_distance_obstacle_x = value;

        // index = getIndexOfObs(agent?.observation_space, "dist_z_to_obstacle");
        // value = obs_space[index];
        // newStateSpace.previous_distance_obstacle_z = value;
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
