// ControllerRouter.js
import { useSceneStore } from "../../../stores/useSceneStore";
import randomController from "./randomController";
import { qLearningAct } from "./policyController";
import { PPOController } from "./ppoController";
import { useRunTimeStore } from "../../../stores/useRunTimeStore";

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
  // No assignment/config => random policy
  console.log("Is Model Ready: " + isModelReady);
  if (!config && !experimentId && !isModelReady)
    return randomController(action_space);

  // Route by algorithm
  if (config?.algorithm === "q-learning" && !isModelReady) {
    console.log("Opting for Q-Table");
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

  if (isModelReady) {
    console.log("Opting for PPO model");
    PPOController(observation_space, agentId);
    return;
  }

  // Fallback
  return randomController(action_space);
}
