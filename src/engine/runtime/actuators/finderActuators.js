import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";

export default function finderAdapter(action, agent, obs) {
  const { entities } = useSceneStore.getState();
  if (action !== "interact")
    return { targetReached: false, previousDistance: obs[2] };
  const position = agent.position;
  const info = getNearestTargetInfo(position, entities, "isTarget");
  const targetReached = info?.found && info?.distance <= info?.radius;
  return { targetReached, previousDistance: obs[2] };
}
