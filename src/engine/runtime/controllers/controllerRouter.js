// ControllerRouter.js
import { useSceneStore } from "../../../stores/useSceneStore"
import randomController  from "./randomController";
import { qLearningAct } from "./policyController"

export default function ControllerRouter(observation_space, agentId, action_space, experimentId) {
  const { assignments } = useSceneStore.getState();
  const config = assignments?.[agentId]?.assignedConfig ?? null;

  // No assignment/config => random policy
  if (!config || !experimentId) return randomController(action_space);

  // Route by algorithm
  if (config.algorithm === "q-learning") {
    return qLearningAct(observation_space, action_space, agentId, config, experimentId);
  }

  // Fallback
  return randomController(action_space);
}
