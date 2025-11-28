import { nearbyObject } from "../../utility/nearByObject";
import { useSceneStore } from "../../../stores/useSceneStore";
export function holderAdapter(action, entity) {
    const { updateEntity, entities, deleteEntity, addEntity } = useSceneStore.getState();

    if (action === "pick") {
        const pickRadius = 2.0;
        const targetObj = nearbyObject(entities, entity.position, pickRadius);

        if (!targetObj && !entity.state_space.heldItemAssetRef) {
            updateEntity(entity.id, {
                last_action: action,
                state_space: {
                    ...entity.state_space,
                    holding: false,
                    heldItemAssetRef: null,
                    lastPickSuccess: false,
                },
            });
            return;
        } else if (!targetObj && entity.state_space.heldItemAssetRef) {
            updateEntity(entity.id, {
                last_action: action
            });
            return;
        } else if (targetObj && entity.state_space.heldItemAssetRef === "null") {
            // Remove object from physics + rendering layer
            deleteEntity(targetObj.id);

            updateEntity(entity.id, {
                last_action: action,
                state_space: {
                    ...entity.state_space,
                    holding: true,
                    heldItemAssetRef: targetObj.assetRef,
                    lastPickSuccess: true,
                },
            });
            return;
        } else if (targetObj && entity.state_space.heldItemAssetRef) {
            updateEntity(entity.id, {
                last_action: action
            });
            return;
        }
    }

    if (action === "drop" && entity.state_space.holding) {

        let [wx, wy, wz] = entity.position;

        wx += 2
        wz += 2;

        const droppedObj = {
            tag: "pickable",
            assetRef: entity.state_space.heldItemAssetRef,
            collider: { shape: "capsule", h: 1, r: 0.4 },
            isDecor: true,
            position: [wx, wy, wz],
            capabilities: ["Pickable"]
        };

        addEntity(droppedObj);

        updateEntity(entity.id, {
            last_action: action,
            state_space: {
                ...entity.state_space,
                holding: false,
                heldItemAssetRef: null,
                lastPickSuccess: false,
            },
        });

        return;

    } else if (action === "drop" && !entity.state_space.holding) {
        updateEntity(entity.id, {
            last_action: action,
            state_space: {
                ...entity.state_space,
                holding: false,
                heldItemAssetRef: null,
                lastPickSuccess: false,
            },
        });
        return;
    }
}