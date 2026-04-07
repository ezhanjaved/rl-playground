// ControllerRouter.js
import { useSceneStore } from "../../../stores/useSceneStore";
import randomController from "./randomController";
import { qLearningAct } from "./policyController";

export default function ControllerRouter(
  observation_space,
  agentId,
  action_space,
  experimentId,
  qTable,
  mode,
) {
  const { assignments } = useSceneStore.getState();
  const config = assignments?.[agentId]?.assignedConfig ?? null;
  // No assignment/config => random policy
  if (!config || !experimentId) return randomController(action_space);

  // Route by algorithm
  if (config.algorithm === "q-learning") {
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

  if (config.algorithm === "ppo") {
    console.log("Opting for PPO model");
    return ppoModel(observation_space);
  }

  // Fallback
  return randomController(action_space);
}
