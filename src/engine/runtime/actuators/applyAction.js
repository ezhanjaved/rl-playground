import { CapabilityMatcher } from "../../capabilities/capabilitiesMatcher.js";
import { useSceneStore } from "../../../stores/useSceneStore.js"
import moveAdapter from "./MoveableActuators.js"
import holderAdapter from "./HolderActuators.js"
import collectorAdapter from "./CollectorActuators.js";

export default function applyAction(action_picked, agent) {
    const { updateEntity } = useSceneStore.getState();

    const capabilityMatched = CapabilityMatcher(action_picked); //Map action to the capability
    
    switch (capabilityMatched) {
        case "Moveable":
            moveableWorker(action_picked, agent, updateEntity)
            break;
        case "Holder":
            holderWorker(action_picked, agent)
            break;
        case "Collector":
            collectorWorker(action_picked, agent)
            break;
        default:
            break;
    }
}

function moveableWorker(action, entity, updateEntity) {
    const { updatedPosition, updatedRotation, targetReached } = moveAdapter(action, entity.position, entity.rotation, entity.id);
    //Update entity's last_action
    updateEntity(entity.id, { last_action: action, position: updatedPosition, rotation: updatedRotation, state_space: {targetReached: targetReached} });
}

function holderWorker(action, entity) {
    holderAdapter(action, entity) //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered   
}

function collectorWorker(action, entity) {
    collectorAdapter(action, entity) //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered   
}