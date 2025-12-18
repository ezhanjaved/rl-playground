// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import distance3D from "../utility/3dDistance";
export default function buildObsSpace(agent) {
    const obs = agent?.observation_space ?? []; //['self_position_x', 'self_position_y', 'self_position_z', 'dist_to_nearest_target']
    const position = agent?.position ?? [0, 0, 0]; //[2.1212, 0, 3.12111]  
    const rotation = agent?.rotation ??[0, 0, 0];
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
                const distanceCalculated = nearestDistance(position, (e) => e.isTarget === true);
                constructedObs.push(distanceCalculated);
                break;
            }
            default:
                constructedObs.push(0);
                break;
        }
    }

    return constructedObs;
}

function nearestDistance(position, predicate) {
    const entities = useSceneStore.getState().entities;
    const MAX_DIST = 1e9;
    let min = Infinity;

    for (const entity of Object.values(entities)) {
        if (!entity) continue;
        if (!predicate(entity)) continue;
        const targetObjPos = entity?.position ?? [0, 0, 0];
        const d = distance3D(position, targetObjPos);
        if (d < min) min = d;
    }

    return Number.isFinite(min) ? min : MAX_DIST;
}

