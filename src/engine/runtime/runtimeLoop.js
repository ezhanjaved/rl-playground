// OBS -> controller -> actuator -> physics -> BG
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";

export default function runTimeloop(entities) {
    const { playing, training } = useRunTimeStore.getState();
    const { currentExperimentId } = useRunTimeStore.getState();
    
    if (!playing || training) return;
    
    Object.values(entities).forEach(entity => { //We will go through each entity
        if (entity.isDecor || !entity.action_space || entity.isPickable || entity.isTarget) {
            return;
        } 
        const observation_space = buildObsSpace(entity); //Here we will build the obs space and then give it to controller
        const action_space = entity.action_space;

        const action = ControllerRouter(observation_space, entity.id, action_space, currentExperimentId, "playing"); //This will give us action
        applyAction(action, entity)
    })
}