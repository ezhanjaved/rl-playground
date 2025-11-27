import { nearbyObject } from "../utility/nearByObject";
import { useSceneStore } from "../../stores/useSceneStore";
export function holderAdapter(action, entity) {
    if (action !== "pick") return;
    let pickRadius = 2.0;
    const { updateEntity, entities } = useSceneStore.getState();
    const targetObj = nearbyObject(entities, entity.position, pickRadius);

    if (!targetObj) {
        updateEntity(entity.id, {
            last_action: action,
            state_space: {
                ...entity.state_space,
                holding: false,
                heldItemId: null,
                lastPickSuccess: false,
            },
        });
        return;
    }

    updateEntity(entity.id, {
        last_action: action,
        state_space: {
            ...entity.state_space,
            holding: true,
            heldItemId: targetObj.id,
            lastPickSuccess: true,
        },
    });

    updateEntity(targetObj.id, {
        collider: null,
        state_space: {
            ...entity.state_space,
            equipped: true,
            attachedTo: entity.id,
        },
    });

}