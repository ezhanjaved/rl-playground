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

  const hasQLearning = config?.algorithm === "q-learning";
  const hasPPO = isModelReady;

  if (!hasQLearning && !hasPPO) return randomController(action_space);

  if (hasQLearning && !hasPPO) {
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

  if (hasPPO) {
    PPOController(observation_space, agentId);
    return null;
  }

  return randomController(action_space);
}
