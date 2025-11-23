// OBS -> controller -> actuator -> physics -> BG
import { useSceneStore } from "../../stores/useSceneStore";
import moveAdapter from "./actuators.js";
import randomController from "./controllers/randomController.js";

export default function runTimeloop(entities) {
    const { updateEntity } = useSceneStore.getState();
    //We will go through each entity
    Object.values(entities).forEach(entity => {
        console.log("Running timeloop for entity:", entity.id); 
        if (entity.capabilities.includes("Moveable")) {
            const observation_space = entity.observation_space;
            const action_space = entity.action_space;
            const action = randomController(action_space);
            const updatedPosition = moveAdapter(action, entity.position);
            //Update entity's last_action
            updateEntity(entity.id, { last_action: action, position: updatedPosition });
            console.log(`Agent ${entity.name} will perform action:`, action, "which is choosen randomly!");
        }
    })
}