import { nearbyObject } from "../../utility/nearByObject";
import { useSceneStore } from "../../../stores/useSceneStore";
export default function holderAdapter(action, entity) {
    const { updateEntity, entities, deleteEntity, addEntity } = useSceneStore.getState();

    if (action === "pick") {
        const pickRadius = 2.0; //Engine Defined - Not User
        const targetObj = nearbyObject(entities, entity.position, pickRadius, entity.capabilities);

        if (!targetObj) {
            updateEntity(entity.id, {
                last_action: action
            });
            return;
        }

        if (targetObj) {
            if (entity.state_space.holding) {
                updateEntity(entity.id, {
                    last_action: action
                });
                return;
            } else if (!entity.state_space.holding) {
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
            } else {
                updateEntity(entity.id, {
                    last_action: action
                });
            }
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
            last_action: action
        });
        return;
    }
}