// (later) trained policies
import { useRunTimeStore } from "../../../stores/useRunTimeStore";
import randomController from "./randomController";
import discretize from "../../utility/discretization";

export function qLearningAct(obsVector, action_space, agentId, config, experimentId) {
  const { experiments, currentExperimentId } = useRunTimeStore.getState();
  const expId = experimentId ?? currentExperimentId;

  const exp = experiments?.[expId] ?? null;

  if (!exp) return randomController(action_space);

  const agentExp = exp?.agents?.[agentId];
  const qTable = agentExp?.learningState?.qTable;

  if (!qTable) return randomController(action_space);

  const stateKey = discretize(obsVector);

  const epsilon = config?.epsilon ?? agentExp?.learningState?.epsilon ?? 0.2;

  if (Math.random() < epsilon) return randomController(action_space);

  // Exploit: pick argmax_a Q(s,a), defaulting missing values to 0
  const row = qTable[stateKey]; // may be undefined if unseen state
  let bestAction = action_space[0];
  let bestVal = -Infinity;

  for (const a of action_space) {
    const v = row?.[a] ?? 0;
    if (v > bestVal) {
      bestVal = v;
      bestAction = a;
    }
  }

  return bestAction;
}
     
export function qLearningLearner(qTable, actionTaken, obsVector, nextObsVector, reward, done, config) {
  if (!qTable) qTable = {};

  const alpha = config?.learningRate ?? 0.1;
  const gamma = config?.rewardImportance ?? 0.99;

  const stateKey = discretize(obsVector);
  const nextStateKey = discretize(nextObsVector ?? obsVector);

  if (!qTable[stateKey]) qTable[stateKey] = {};
  if (!qTable[nextStateKey]) qTable[nextStateKey] = {};

  if (qTable[stateKey][actionTaken] === undefined) qTable[stateKey][actionTaken] = 0;

  const nextValues = Object.values(qTable[nextStateKey]);
  const maxNextQ = done ? 0 : nextValues.length === 0 ? 0 : Math.max(...nextValues);

  qTable[stateKey][actionTaken] =
    qTable[stateKey][actionTaken] + alpha * (reward + gamma * maxNextQ - qTable[stateKey][actionTaken]);

  return qTable;
}