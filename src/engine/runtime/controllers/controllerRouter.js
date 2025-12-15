import randomController from "./randomController";
import { qLearningAct } from "./policyController";
import { useSceneStore } from "../../../stores/useSceneStore";

export default function ControllerRouter(observation_space, agentId, action_space) {
    //It will take OBS (vector data) and agent data and action space
    //Check if agent has assignment
    //If no assignment we can conclude that agent is not bounded with any graph and we can safely use a random controller
    //If assignment is present we will check config (algo)
    //Since Q-learning is the only one supported rn we will send agent data, action space, obs space (data), assignment.config to a Q-Learning Controller.act
    //This Q-Learning Controller.act will only working if training would be going on -if training wouldn't be going on - we will simply resort to random controller for action sampling
    //Q-Learning Controller.act would return an action
    const { assignments } = useSceneStore.getState();
    const config = assignments?.[agentId]?.assignedConfig ?? null;

    if (!config) {
        return randomController(action_space);
    }

    if (config.algorithm === "q-learning") {
        return qLearningAct(observation_space, action_space, agentId, config)
    }

    return randomController(action_space);
} 