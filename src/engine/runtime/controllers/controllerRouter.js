// ControllerRouter.js
import { useSceneStore } from "../../../stores/useSceneStore";
import randomController from "./randomController";
import manualController from "./manualController";
import { qLearningAct } from "./policyController";
import { PPOController } from "./ppoController";
import { useRunTimeStore } from "../../../stores/useRunTimeStore";

export default function ControllerRouter(
  seq,
  observation_space,
  observation_vector,
  agentId,
  action_space,
  experimentId,
  qTable,
  mode,
  isModelReady,
) {
  const { assignments, entities } = useSceneStore.getState();
  const config = assignments?.[agentId]?.assignedConfig ?? null;
  const agentController = entities[agentId]?.controller;

  if (agentController === "manual") {
    const manual_action = manualController();
    return manual_action;
  }

  const hasQLearning = config?.algorithm === "q-learning";
  const hasPPO = isModelReady;

  const { setControllerMode } = useRunTimeStore.getState();

  if (!hasQLearning && !hasPPO) return randomController(action_space);

  if (hasQLearning && !hasPPO) {
    setControllerMode("Policy (Q-Learning)");
    return qLearningAct(
      observation_space,
      observation_vector,
      action_space,
      agentId,
      config,
      experimentId,
      qTable,
      mode,
    );
  }

  if (hasPPO) {
    setControllerMode("Policy (PPO)");
    PPOController(seq, observation_space, agentId);
    return null;
  }

  return randomController(action_space);
}
