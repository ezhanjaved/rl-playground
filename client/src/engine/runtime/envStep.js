import applyAction from "./actuators/applyAction.js";
import BehaviorGraphEval from "../behavior/evaluator.js";
export function envSet(action_picked, agent, obsVector, step) {
  applyAction(action_picked, agent, obsVector);
  const bg = BehaviorGraphEval(agent.id, obsVector, step);
  return {
    reward: bg.reward,
    finished: bg.terminated || bg.truncated,
    nextObs: bg.postObs,
    info: bg.info ?? {},
  };
}
