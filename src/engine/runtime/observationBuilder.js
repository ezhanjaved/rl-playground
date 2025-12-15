// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
export default function buildObsSpace(agent) {
    const obs = agent?.observation_space ?? []; //['self_position_x', 'self_position_y', 'self_position_z', 'dist_to_nearest_target']
    const position = agent?.position ?? [0, 0, 0]; //[2.1212, 0, 3.12111]  
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

function distance3D(a, b) {
    const dx = (a[0] ?? 0) - (b[0] ?? 0);
    const dy = (a[1] ?? 0) - (b[1] ?? 0);
    const dz = (a[2] ?? 0) - (b[2] ?? 0);
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
}