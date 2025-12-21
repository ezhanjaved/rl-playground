// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import distance3D from "../utility/3dDistance";
export default function buildObsSpace(agent) {
    const obs = agent?.observation_space ?? []; //['self_position_x', 'self_position_y', 'self_position_z', 'dist_to_nearest_target']
    const position = agent?.position ?? [0, 0, 0]; //[2.1212, 0, 3.12111]  
    const rotation = agent?.rotation ??[0, 0, 0];
    const stateSpace = agent?.state_space;
    const constructedObs = [];
    
    for (const obsVar of obs) {
        switch (obsVar) {
            case "self_position_x":
                constructedObs.push(position[0]);
                break;
            case "self_position_y":
                constructedObs.push(position[1]);
                break;
            case "self_position_z":
                constructedObs.push(position[2]);
                break;
            case "self_rotation_x":
                constructedObs.push(rotation[0]); 
                break;
            case "self_rotation_y":
                constructedObs.push(rotation[1]);
                break;
            case "self_rotation_z":
                constructedObs.push(rotation[2]);
                break;
            case "dist_to_nearest_target": {
                const distanceCalculated = nearestDistance(position, (e) => e.isTarget === true || e.isTarget === "true" || e.isTarget === 1);
                constructedObs.push(distanceCalculated);
                break;
            }
            case "holding": 
                const flagStatus = stateSpace?.holding;
                constructedObs.push(flagStatus);
                break;
            case "dist_to_nearest_pickable": {
                const distanceCalculated = nearestDistance(position, (e) => e.isPickable === true || e.isPickable === "true" || e.isPickable === 1);
                constructedObs.push(distanceCalculated);
                break;
            }
            case "dist_to_nearest_collectable": {
                const distanceCalculated = nearestDistance(position, (e) => e.isCollectable === true || e.isCollectable === "true" || e.isCollectable === 1);
                constructedObs.push(distanceCalculated);
                break;
            }
            case "items_collected":
                const itemsCollection = stateSpace?.items_collected;
                constructedObs.push(itemsCollection);
                break;
            default:
                constructedObs.push(0);
                break;
        }
    }
    return constructedObs;
}

function nearestDistance(position, predicate) {
    const {entities} = useSceneStore.getState();
    const MAX_DIST = 1e9;
    let min = Infinity;

    for (const entity of Object.values(entities)) {
        if (!entity) continue;
        if (!predicate(entity)) continue;
        const targetObjPos = entity?.position ?? [0, 0, 0];
        const d = distance3D(position, targetObjPos);
        if (Number.isFinite(d) && d < min) min = d;
    }
    return Number.isFinite(min) ? min : MAX_DIST;
}