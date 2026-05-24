import applyAction from "./actuators/applyAction.js";
import BehaviorGraphEval from "../behavior/evaluator.js";
import buildObsSpace from "./observationBuilder.js";

export function envSet(action_picked, agent, obsVector, step) {
  applyAction(action_picked, agent, obsVector);
  const nextObs = buildObsSpace(agent);
  const bg = BehaviorGraphEval(agent.id, nextObs, step);
  return { reward: bg.reward, done: bg.done, nextObs, info: bg.info ?? {} };
}
