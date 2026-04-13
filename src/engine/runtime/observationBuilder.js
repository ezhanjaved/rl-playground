// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import getNearestTargetInfo from "../utility/nearByObjects";
import distance3D from "../utility/3dDistance";
import { obstacleAvoid } from "../utility/obstacleAvoidance";
export default function buildObsSpace(agent) {
  const { entities } = useSceneStore.getState();
  const obs = agent?.observation_space ?? [];
  const position = agent?.position;
  const rotation = agent?.rotation;
  const stateSpace = agent?.state_space;
  // console.log("State Space: " + JSON.stringify(stateSpace, null, 2));
  const constructedObs = [];

  const targetPredicate = (e) =>
    e.isTarget === true || e.isTarget === "true" || e.isTarget === 1;
  const pickablePredicate = (e) =>
    e.isPickable === true || e.isPickable === "true" || e.isPickable === 1;
  const collectPredicate = (e) =>
    e.isCollectable === true ||
    e.isCollectable === "true" ||
    e.isCollectable === 1;
  const obstaclePredicate = (e) =>
    e.isDecor === true || e.isDecor === "true" || e.isDecor === 1;

  for (const obsVar of obs) {
    switch (obsVar) {
      case "dist_x_to_obstacle": {
        const { min: distanceXObstacle } = nearestDistance(
          position,
          obstaclePredicate,
          "x",
        );
        constructedObs.push(distanceXObstacle.toFixed(2));
        break;
      }
      case "dist_z_to_obstacle": {
        const { min: distanceZObstacle } = nearestDistance(
          position,
          obstaclePredicate,
          "z",
        );
        constructedObs.push(distanceZObstacle.toFixed(2));
        break;
      }
      case "dist_to_nearest_obstacle": {
        const { min: distanceObstacle } = nearestDistance(
          position,
          obstaclePredicate,
          "both",
        );
        constructedObs.push(distanceObstacle.toFixed(2));
        break;
      }
      case "obstacle_in_path": {
        const { min, minPos: nearestObstacle } = nearestDistance(
          position,
          obstaclePredicate,
          "both",
        );
        console.log("Nearest Obstacle Position: " + nearestObstacle);
        console.log("Nearest Obstacle Distance: " + min);
        if (min === 1e9) {
          constructedObs.push(false);
        } else {
          const obsInPath = obstacleAvoid(position, rotation, nearestObstacle);
          constructedObs.push(obsInPath);
        }
        break;
      }
      case "dist_x_to_target": {
        const { min: distanceXtarget } = nearestDistance(
          position,
          targetPredicate,
          "x",
        );
        constructedObs.push(distanceXtarget.toFixed(2));
        break;
      }
      case "dist_z_to_target": {
        const { min: distanceZtarget } = nearestDistance(
          position,
          targetPredicate,
          "z",
        );
        constructedObs.push(distanceZtarget.toFixed(2));
        break;
      }
      case "dist_to_nearest_target": {
        const { min: distanceTarget } = nearestDistance(
          position,
          targetPredicate,
          "both",
        );
        constructedObs.push(distanceTarget.toFixed(2));
        break;
      }
      case "in_target_radius": {
        const info = getNearestTargetInfo(position, entities, "isTarget");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached);
        break;
      }
      case "dist_x_to_pickable": {
        const { min: distanceXpickable } = nearestDistance(
          position,
          pickablePredicate,
          "x",
        );
        constructedObs.push(distanceXpickable.toFixed(2));
        break;
      }
      case "dist_z_to_pickable": {
        const { min: distanceZpickable } = nearestDistance(
          position,
          pickablePredicate,
          "z",
        );
        constructedObs.push(distanceZpickable.toFixed(2));
        break;
      }
      case "dist_to_nearest_pickable": {
        const { min: distancePickable } = nearestDistance(
          position,
          pickablePredicate,
          "both",
        );
        constructedObs.push(distancePickable.toFixed(2));
        break;
      }
      case "holding": {
        const flagStatus = stateSpace?.holding;
        constructedObs.push(flagStatus);
        break;
      }
      case "dist_x_to_collect": {
        const { min: distanceXcollect } = nearestDistance(
          position,
          collectPredicate,
          "x",
        );
        constructedObs.push(distanceXcollect.toFixed(2));
        break;
      }
      case "dist_z_to_collect": {
        const { min: distanceZcollect } = nearestDistance(
          position,
          collectPredicate,
          "z",
        );
        constructedObs.push(distanceZcollect.toFixed(2));
        break;
      }
      case "dist_to_nearest_collectable": {
        const { min: distanceCollect } = nearestDistance(
          position,
          collectPredicate,
          "both",
        );
        constructedObs.push(distanceCollect.toFixed(2));
        break;
      }
      case "items_collected": {
        const itemsCollection = stateSpace?.items_collected;
        constructedObs.push(itemsCollection);
        break;
      }
      default:
        constructedObs.push(0);
        break;
    }
  }
  return constructedObs;
}

export function nearestDistance(position, predicate, mode) {
  const { entities } = useSceneStore.getState();
  const MAX_DIST = 100.0;
  let min = MAX_DIST;
  let minPos = [];

  for (const entity of Object.values(entities)) {
    if (!entity) continue;
    if (!predicate(entity)) continue;
    const targetObjPos = entity?.position ?? [0, 0, 0];
    let d;
    if (mode === "both") {
      d = distance3D(position, targetObjPos);
    } else if (mode === "x") {
      d = Math.abs(position?.[0] - targetObjPos?.[0]);
    } else if (mode === "z") {
      d = Math.abs(position?.[2] - targetObjPos?.[2]);
    }
    if (Number.isFinite(d) && d < min) {
      min = d;
      minPos = targetObjPos;
    }
  }
  const normalizedMin = min / MAX_DIST;
  return { min: normalizedMin, minPos };
}
