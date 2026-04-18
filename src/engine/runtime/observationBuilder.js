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
        const { min } = nearestDistance(position, obstaclePredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_obstacle": {
        const { min } = nearestDistance(position, obstaclePredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_obstacle": {
        const { min } = nearestDistance(position, obstaclePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "obstacle_in_path": {
        const { min, minPos } = nearestDistance(
          position,
          obstaclePredicate,
          "both",
        );

        if (min === 1.0) {
          // server uses 100.0 → normalized to 1.0
          constructedObs.push(0); // False → 0
        } else {
          const obsInPath = obstacleAvoid(position, rotation, minPos);
          constructedObs.push(obsInPath ? 1 : 0);
        }
        break;
      }

      case "dist_x_to_target": {
        const { min } = nearestDistance(position, targetPredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_target": {
        const { min } = nearestDistance(position, targetPredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_target": {
        const { min } = nearestDistance(position, targetPredicate, "both");
        console.log("Normalized Dist: " + min * 100.0);
        constructedObs.push(min);
        break;
      }

      case "in_target_radius": {
        const info = getNearestTargetInfo(position, entities, "isTarget");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "dist_x_to_pickable": {
        const { min } = nearestDistance(position, pickablePredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_pickable": {
        const { min } = nearestDistance(position, pickablePredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_pickable": {
        const { min } = nearestDistance(position, pickablePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "holding": {
        constructedObs.push(stateSpace?.holding ? 1 : 0);
        break;
      }

      case "dist_x_to_collect": {
        const { min } = nearestDistance(position, collectPredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_collect": {
        const { min } = nearestDistance(position, collectPredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_collectable": {
        const { min } = nearestDistance(position, collectPredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "items_collected": {
        constructedObs.push(stateSpace?.items_collected ?? 0);
        break;
      }

      default:
        constructedObs.push(0);
        break;
    }
  }

  return sanitizeObs(constructedObs);
}

function sanitizeObs(obs) {
  return obs.map((v) => {
    if (Number.isNaN(v)) return 0.0;
    if (v === Infinity) return 1.0;
    if (v === -Infinity) return -1.0;
    return v;
  });
}

export function nearestDistance(position, predicate, mode) {
  const { entities } = useSceneStore.getState();

  const MAX_DIST = 100.0;
  let min = MAX_DIST;
  let minPos = [];
  let found = false;

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
      d = Math.abs(position?.[2] - targetObjPos?.[2]); // keep as requested
    }

    if (Number.isFinite(d) && d < min) {
      min = d;
      minPos = targetObjPos;
      found = true;
    }
  }

  if (!found) {
    return { min: 1.0, minPos: [] }; // match server normalized (100 / 100)
  }

  return {
    min: min / MAX_DIST,
    minPos,
  };
}
