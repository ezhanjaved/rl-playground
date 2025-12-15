// OBS -> controller -> actuator -> physics -> BG
import { useSceneStore } from "../../stores/useSceneStore";
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import moveAdapter from "./actuators/MoveableActuators.js";
import { holderAdapter } from "./actuators/HolderActuators.js";
import { collectorAdapter } from "./actuators/CollectorActuators.js";
import { CapabilityMatcher } from "../capabilities/capabilitiesMatcher.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";

export default function runTimeloop(entities) {
    const { updateEntity } = useSceneStore.getState();
    const { playing, training } = useRunTimeStore.getState();
    
    if (!playing || training) return;
    
    Object.values(entities).forEach(entity => { //We will go through each entity
        
        if (entity.isDecor || !entity.action_space || entity.isPickable) {
            return;
        } 

        const observation_space = buildObsSpace(entity); //Here we will build the obs space and then give it to controller
        const action_space = entity.action_space;

        const action = ControllerRouter(observation_space, entity.id, action_space); //This will give us action
        
        const capabilityMatched = CapabilityMatcher(action); //Map action to the capability

        switch (capabilityMatched) {
            case "Moveable":
                moveableWorker(action, entity, updateEntity)
                break;
            case "Holder":
                holderWorker(action, entity)
                break;
            case "Collector":
                collectorWorker(action, entity)
                break;
            default:
                break;
        }
    })
}

function moveableWorker(action, entity, updateEntity) {
    const { updatedPosition, updatedRotation } = moveAdapter(action, entity.position, entity.rotation, entity.id);
    //Update entity's last_action
    updateEntity(entity.id, { last_action: action, position: updatedPosition, rotation: updatedRotation });
}

function holderWorker(action, entity) {
    holderAdapter(action, entity) //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered   
}

function collectorWorker(action, entity) {
    collectorAdapter(action, entity) //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered   
}