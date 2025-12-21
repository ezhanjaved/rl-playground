// (later) trained policies
import { useRunTimeStore } from "../../../stores/useRunTimeStore";
import randomController from "./randomController";
import discretize from "../../utility/discretization";

export function qLearningAct(obsVector, action_space, agentId, config, experimentId, mode) {
  const { experiments, currentExperimentId } = useRunTimeStore.getState();
  const expId = experimentId ?? currentExperimentId;

  const exp = experiments?.[expId] ?? null;

  if (!exp) {
    console.log("Experiment not found - choosing random!");
    return randomController(action_space);
  } 

  const agentExp = exp?.agents?.[agentId];
  const qTable = agentExp?.learningState?.qTable;

  if (!qTable) {
    console.log("QTable not found - choosing random");
    return randomController(action_space);
  } 

  const stateKey = discretize(obsVector);

  const epsilonTrain = config?.epsilon ?? agentExp?.learningState?.epsilon ?? 0.8;
  const epsilon = mode === "training" ? epsilonTrain : 0;

  if (Math.random() < epsilon) {
    console.log("Random Number was less than Epislon (which is 1) - choosing random");
    return randomController(action_space);
  }

  const row = qTable[stateKey]; 
  let bestAction = action_space[0];
  let bestVal = -Infinity;

  for (const a of action_space) {
    const v = row?.[a] ?? 0;
    if (v > bestVal) {
      bestVal = v;
      bestAction = a;
    }
  }

  console.log("Using Q-Table - picked action: " + bestAction);
  return bestAction;
}
     
export function qLearningLearner(qTable, actionTaken, obsVector, nextObsVector, reward, done, config) {
  if (!qTable) qTable = {};
  let alpha;

  const learningRate = config?.learningSpeed ?? "Medium"; //learningRate from user is in Strings like Slow, Medium and Fast
  
  if (learningRate === "Slow") {
    alpha = 0.2;
  } else if (learningRate === "Medium") {
    alpha = 0.6;
  } else if (learningRate === "Fast") {
    alpha = 0.8;
  } else {
    alpha = 0.6
  }

  const gamma = config?.rewardImportance ?? 0.99;

  const stateKey = discretize(obsVector);
  const nextStateKey = discretize(nextObsVector ?? obsVector);

  if (!qTable[stateKey]) qTable[stateKey] = {};
  if (!qTable[nextStateKey]) qTable[nextStateKey] = {};

  if (qTable[stateKey][actionTaken] === undefined) qTable[stateKey][actionTaken] = 0;

  const nextValues = Object.values(qTable[nextStateKey]);
  const maxNextQ = done ? 0 : nextValues.length === 0 ? 0 : Math.max(...nextValues);

  qTable[stateKey][actionTaken] = qTable[stateKey][actionTaken] + alpha * (reward + gamma * maxNextQ - qTable[stateKey][actionTaken]);
  return qTable;
}