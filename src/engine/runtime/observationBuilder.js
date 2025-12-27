// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import distance3D from "../utility/3dDistance";
export default function buildObsSpace(agent) {
    const obs = agent?.observation_space ?? [];
    const position = agent?.position;
    const stateSpace = agent?.state_space;
    console.log("State Space: " + JSON.stringify(stateSpace, null, 2));
    const constructedObs = [];

    const targetPredicate = (e) => e.isTarget === true || e.isTarget === "true" || e.isTarget === 1;
    const pickablePredicate = (e) => e.isPickable === true || e.isPickable === "true" || e.isPickable === 1;
    const collectPredicate =  (e) => e.isCollectable === true || e.isCollectable === "true" || e.isCollectable ===1;
    
    for (const obsVar of obs) {
        switch (obsVar) {
            case "dist_x_to_target": {
                const distanceXtarget = nearestDistance(position, targetPredicate, "x");
                constructedObs.push(distanceXtarget.toFixed(2));
                break;
            }
            case "dist_z_to_target": {
                const distanceZtarget = nearestDistance(position, targetPredicate, "z");
                constructedObs.push(distanceZtarget.toFixed(2));
                break;
            }
            case "dist_to_nearest_target": {
                const distanceTarget = nearestDistance(position, targetPredicate,"both");
                constructedObs.push(distanceTarget.toFixed(2));
                break;
            }
            case 'dist_x_to_pickable': {
                const distanceXpickable = nearestDistance(position, pickablePredicate, "x");
                constructedObs.push(distanceXpickable.toFixed(2));
                break;
            }
            case 'dist_z_to_pickable': {
                const distanceZpickable = nearestDistance(position, pickablePredicate, "z");
                constructedObs.push(distanceZpickable.toFixed(2));
                break;
            }
            case "dist_to_nearest_pickable": {
                const distancePickable = nearestDistance(position, pickablePredicate, "both");
                constructedObs.push(distancePickable.toFixed(2));
                break;
            }
            case "holding": 
                const flagStatus = stateSpace?.holding;
                constructedObs.push(flagStatus);
                break;
            case 'dist_x_to_collect': {
                const distanceXcollect = nearestDistance(position, collectPredicate, "x");
                constructedObs.push(distanceXcollect.toFixed(2));
                break;
            }
            case 'dist_z_to_collect': {
                const distanceZcollect = nearestDistance(position, collectPredicate, "z");
                constructedObs.push(distanceZcollect.toFixed(2));
                break;
            }
            case "dist_to_nearest_collectable": {
                const distanceCollect = nearestDistance(position, collectPredicate, "both");
                constructedObs.push(distanceCollect.toFixed(2));
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

export function nearestDistance(position, predicate, mode) {
    const {entities} = useSceneStore.getState();
    const MAX_DIST = 1e9;
    let min = Infinity;
    let d = -Infinity;

    for (const entity of Object.values(entities)) {
        if (!entity) continue;
        if (!predicate(entity)) continue;
        const targetObjPos = entity?.position ?? [0, 0, 0];
        if (mode === "both") {
            d = distance3D(position, targetObjPos);
        } else if (mode === "x") {
            d = position?.[0] - targetObjPos?.[0];  
        } else if (mode === "z") {
            d = position?.[2] - targetObjPos?.[2];
        }
        if (Number.isFinite(d) && d < min) min = d;
    }
    return Number.isFinite(min) ? min : MAX_DIST;
}