// (later) trained policies
import { useRunTimeStore } from "../../../stores/useRunTimeStore";
import { useSceneStore } from "../../../stores/useSceneStore";
import randomController from "./randomController";
import discretize from "../../utility/discretization";

export function qLearningAct(obsVector, action_space, agentId, config, experimentId, qTablePassed, mode) {
  const { experiments, currentExperimentId } = useRunTimeStore.getState();
  const expId = experimentId ?? currentExperimentId;

  const exp = experiments?.[expId] ?? null;

  if (!exp) {
    console.log("Experiment not found - choosing random!");
    return randomController(action_space);
  } 

  const agentExp = exp?.agents?.[agentId];
  const qTable = qTablePassed !== null ? qTablePassed : agentExp?.learningState?.qTable;

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
  console.log("row keys:", Object.keys(row ?? {}));
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
     
export function qLearningLearner(qTable, actionTaken, obsVector, nextObsVector, reward, done, config, agentId) {
  const { entities } = useSceneStore.getState();
  const action_space = entities?.[agentId]?.action_space ?? [];
  if (!qTable) qTable = {};
  let alpha;
  console.log("Reward Given To Q Learner: " + reward);
  const learningRate = config?.learningSpeed ?? "Medium"; //learningRate from user is in Strings like Slow, Medium and Fast
  
  if (learningRate === "Slow") {
    alpha = 0.05;
  } else if (learningRate === "Medium") {
    alpha = 0.10;
  } else if (learningRate === "Fast") {
    alpha = 0.20;
  } else {
    alpha = 0.10
  }

  const gamma = config?.rewardImportance ?? 0.99;
  console.log("action_space:", action_space);
  console.log("actionTaken:", actionTaken);

  const stateKey = discretize(obsVector);
  const nextStateKey = discretize(nextObsVector ?? obsVector);

  if (!qTable[stateKey]) {
    qTable[stateKey] = {};
    for (const a of action_space) qTable[stateKey][a] = 0;
  };

  if (!qTable[nextStateKey]) {
    qTable[nextStateKey] = {};
    for (const a of action_space) qTable[nextStateKey][a] = 0;
  };

  if (qTable[stateKey][actionTaken] === undefined) qTable[stateKey][actionTaken] = 0;

  let maxNextQ = 0;
  if (!done) {
    maxNextQ = -Infinity;
    for (const a of action_space) {
      const v = qTable[nextStateKey][a] ?? 0;
      if (v > maxNextQ) maxNextQ = v;
    }
    if (maxNextQ === -Infinity) maxNextQ = 0;
  }

  const oldQTable = qTable[stateKey][actionTaken] ?? 0;
  qTable[stateKey][actionTaken] = oldQTable + alpha * (reward + gamma * maxNextQ - oldQTable);
  return qTable;
}