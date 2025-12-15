// (later) trained policies
import { useRunTimeStore } from "../../../stores/useRunTimeStore";
import randomController from "./randomController";
import discretize from "../../utility/discretization";

export function qLearningAct(obsVector, action_space, agentId, config) {
    //discretize OBS -> create a state key -> do a lookup using state_key to get an action!
    //if state_key not present we will add it into q-table and pick a random action
    const { training, experiments, currentExperimentId  } = useRunTimeStore.getState();
    
    const exp = experiments?.[currentExperimentId] ?? null;
    const expStatus = exp?.status ?? null;

    if (!training || !exp || expStatus !== "Training") return randomController(action_space);
    
    const agentExp = exp?.agents?.[agentId];
    const qTable = agentExp?.learningState?.qTable;

    if (!qTable) return randomController(action_space);
    
    const stateKey = discretize(obsVector);
    
    if (!qTable[stateKey]) {
        qTable[stateKey] = {};
        for (const singleAction of action_space) {
            qTable[stateKey][singleAction] = 0;
            return randomController(action_space);
       }        
    }

    const epsilon = config?.epsilon ?? agentExp?.learningState?.epsilon ?? 0.2
    if (Math.random() < epsilon) {
        return randomController(action_space);
    }

    let bestAction = action_space[0];
    let bestVal = -Infinity;

    for (const a of action_space) {
        const v = qTable[stateKey][a] ??  0;
        if (v > bestVal) {
            bestVal = v;
            bestAction = a;
        }
    }
    return bestAction;
}
     
export function qLearningLearner(agentId, actionTaken, ObsVector, NextObsVector, Reward, done=false) {
    //This will be called with data like action taken, obs_space, nextobs, reward, flag (optional) - this will only update the internal system no output
    //Learning function will be called after BG evaluator has calculated reward
    const { experiments, currentExperimentId } = useRunTimeStore.getState();
    const exp = experiments?.[currentExperimentId];
    if (!exp || exp.status !== "Training") return;
    const agentExp = exp?.agents?.[agentId]; 
    if (!agentExp) return;

    const qTable = agentExp?.learningState?.qTable;
    const config = agentExp.config;
    if (!qTable) return;

    const alpha = config.learningRate ?? 0.1;
    const gamma = config.rewardImportance ?? 0.99;

    const stateKey = discretize(ObsVector);
    const nextStateKey = discretize(NextObsVector);

    if (!qTable[stateKey]) qTable[stateKey] = {};
    if (!qTable[nextStateKey]) qTable[nextStateKey] = {};
 
    if (qTable[stateKey][actionTaken] === undefined) {
        qTable[stateKey][actionTaken] = 0
    }

    const nextValues = Object.values(qTable[nextStateKey]);
    const maxNextQ = done ? 0 : nextValues.length === 0 ? 0: Math.max(...nextValues);
    
    qTable[stateKey][actionTaken] += alpha * (Reward + gamma*maxNextQ - qTable[stateKey][actionTaken])
}