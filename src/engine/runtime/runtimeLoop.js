// OBS -> controller -> actuator -> physics -> BG
import { useSceneStore } from "../../stores/useSceneStore";
import moveAdapter from "./MoveableActuators.js";
import { holderAdapter } from "./HolderActuators.js";
import randomController from "./controllers/randomController.js";
import { CapabilityMatcher } from "../capabilities/capabilitiesMatcher.js";

export default function runTimeloop(entities) {
    const { updateEntity } = useSceneStore.getState();
    //We will go through each entity
    Object.values(entities).forEach(entity => {
        
        if (entity.isDecor || !entity.action_space) {
            return;
        } 

        const observation_space = entity.observation_space;
        //Here we will build the obs space and then give it to controller
        const action_space = entity.action_space;
        const action = randomController(action_space); // 5 - pick
        //Map action to the capability
        const capabilityMatched = CapabilityMatcher(action);

        switch (capabilityMatched) {
            case "Moveable":
                moveableWorker(action, entity, updateEntity)
                break;
            case "Holder":
                holderWorker(action, entity, updateEntity, entities)
                break;
            case "Interactable":
                break;
            default:
                break;
        }
    })
}

function moveableWorker(action, entity, updateEntity) {
    const { updatedPosition, updatedRotation } = moveAdapter(action, entity.position, entity.rotation);
    //Update entity's last_action
    updateEntity(entity.id, { last_action: action, position: updatedPosition, rotation: updatedRotation });
    console.log(`Agent ${entity.name} will perform action:`, action, "which is choosen randomly!");
}

function holderWorker(action, entity, entities) {
    holderAdapter(action, entity, entities) //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered   
}