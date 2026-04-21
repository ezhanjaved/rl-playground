import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";

export default function finderAdapter(action, agent, obs, obsSpace) {
  const { entities } = useSceneStore.getState();

  const getObs = (key) => {
    const idx = obsSpace?.indexOf(key) ?? -1;
    return idx === -1 ? null : obs[idx];
  };

  if (action !== "interact") {
    return {
      targetReached: false,
      previousDistance: getObs("dist_to_nearest_target"),
    };
  }

  const position = agent.position;
  const info = getNearestTargetInfo(position, entities, "isTarget");
  const targetReached = info?.found && info?.distance <= info?.radius;
  console.log("Target Reached: " + targetReached);
  return {
    targetReached,
    previousDistance: getObs("dist_to_nearest_target"),
  };
}
