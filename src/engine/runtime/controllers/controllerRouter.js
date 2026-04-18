// ControllerRouter.js
import { useSceneStore } from "../../../stores/useSceneStore";
import randomController from "./randomController";
import { qLearningAct } from "./policyController";
import { PPOController } from "./ppoController";

export default function ControllerRouter(
  observation_space,
  agentId,
  action_space,
  experimentId,
  qTable,
  mode,
  isModelReady,
) {
  const { assignments } = useSceneStore.getState();
  const config = assignments?.[agentId]?.assignedConfig ?? null;

  if (!config && !experimentId && !isModelReady)
    return randomController(action_space);

  if (config?.algorithm === "q-learning" && !isModelReady) {
    return qLearningAct(
      observation_space,
      action_space,
      agentId,
      config,
      experimentId,
      qTable,
      mode,
    );
  }
  console.log(isModelReady);
  if (isModelReady) {
    PPOController(observation_space, agentId); // sends obs, returns nothing
    return null; // ← loop does nothing; ccWebsocket callback applies the action
  }

  return randomController(action_space);
}
