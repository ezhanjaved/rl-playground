import { nearbyObject } from "../../utility/nearByObject";
import { useSceneStore } from "../../../stores/useSceneStore";
export default function collectorAdapter(action, agent) {
    const { updateEntity, entities, deleteEntity } = useSceneStore.getState();
    if (action === "collect") {
        const pickRadius = 1.0; //Engine Defined - Not User
        const targetObj = nearbyObject(entities, agent.position, pickRadius, agent.capabilities);
        console.log("Target Obj: " + targetObj);

        if (!targetObj) {
            updateEntity(agent.id, {
                last_action: action
            });
            return;
        }

        if (targetObj) {
            console.log("Collecting!");
            const numberOfPickedItems = agent?.state_space?.items_collected;
            const updatedNumber = numberOfPickedItems + 1;
            updateEntity(agent.id, {
                last_action: action,
                state_space: {
                    ...agent.state_space,
                    lastItemCollected: targetObj.tag,
                    items_collected: updatedNumber,
                    lastPickSuccess: true,
                }
            });
            deleteEntity(targetObj.id); //Remove item from env - it is collected now!
            return;
        }
    }
}   