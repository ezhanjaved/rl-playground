// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import getNearestTargetInfo from "../utility/nearByObjects";
import distance3D from "../utility/3dDistance";
import { obstacleAvoid } from "../utility/obstacleAvoidance";

const MAX_DIST = 40.0;

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

const depositPredicate = (e) =>
  e.isDeposit === true || e.isDeposit === "true" || e.isDeposit === 1;

export function nearestDistance(position, rotation, predicate, mode, entities) {
  let minDist = Infinity;
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
      d = Math.abs(position?.[2] - targetObjPos?.[2]);
    } else if (mode === "x-delta") {
      const dx = targetObjPos?.[0] - position?.[0];
      const dz = targetObjPos?.[2] - position?.[2];
      const theta = rotation?.[1] ?? 0;
      d = Math.cos(theta) * dx + Math.sin(theta) * dz;
    } else if (mode === "z-delta") {
      const dx = targetObjPos?.[0] - position?.[0];
      const dz = targetObjPos?.[2] - position?.[2];
      const theta = rotation?.[1] ?? 0;
      d = -Math.sin(theta) * dx + Math.cos(theta) * dz;
    }

    if (Number.isFinite(d) && d < minDist) {
      minDist = d;
      minPos = targetObjPos;
      found = true;
    }
  }

  if (!found) {
    return { min: 1.0, minPos: [] };
  }

  return {
    min: Math.min(minDist / MAX_DIST, 1.0),
    minPos,
  };
}

function makeCache(position, rotation, entities) {
  const _cache = new Map();

  return function getCached(predicate, mode) {
    const key = `${predicate.name}_${mode}`;
    if (!_cache.has(key)) {
      _cache.set(
        key,
        nearestDistance(position, rotation, predicate, mode, entities),
      );
    }
    return _cache.get(key);
  };
}

export default function buildObsSpace(agent) {
  const { entities } = useSceneStore.getState();

  const obs = agent?.observation_space ?? [];
  const position = agent?.position;
  const rotation = agent?.rotation;
  const stateSpace = agent?.state_space;

  const constructedObs = [];
  const cached = makeCache(position, rotation, entities);

  for (const obsVar of obs) {
    switch (obsVar) {
      case "agent_pos_x": {
        constructedObs.push((position?.[0] ?? 0) / MAX_DIST);
        break;
      }

      case "agent_pos_z": {
        constructedObs.push((position?.[2] ?? 0) / MAX_DIST);
        break;
      }

      case "agent_rotation_y": {
        const ry = rotation?.[1] ?? 0;
        constructedObs.push(ry / Math.PI);
        break;
      }

      case "dist_x_to_obstacle": {
        const { min } = cached(obstaclePredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_obstacle": {
        const { min } = cached(obstaclePredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_obstacle": {
        const { min } = cached(obstaclePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_obstacle": {
        const { min } = cached(obstaclePredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_obstacle": {
        const { min } = cached(obstaclePredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "obstacle_in_path": {
        const { min, minPos } = cached(obstaclePredicate, "both");
        if (min >= 1.0) {
          constructedObs.push(0);
        } else {
          const obsInPath = obstacleAvoid(position, rotation, minPos);
          constructedObs.push(obsInPath ? 1 : 0);
        }
        break;
      }

      case "dist_x_to_target": {
        const { min } = cached(targetPredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_target": {
        const { min } = cached(targetPredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_target": {
        const { min } = cached(targetPredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_target": {
        const { min } = cached(targetPredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_target": {
        const { min } = cached(targetPredicate, "z-delta");
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
        const { min } = cached(pickablePredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_pickable": {
        const { min } = cached(pickablePredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_pickable": {
        const { min } = cached(pickablePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_pickable": {
        const { min } = cached(pickablePredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_pickable": {
        const { min } = cached(pickablePredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "holding": {
        constructedObs.push(stateSpace?.holding ? 1 : 0);
        break;
      }

      case "dist_x_to_collect": {
        const { min } = cached(collectPredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_collect": {
        const { min } = cached(collectPredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_collectable": {
        const { min } = cached(collectPredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_collectable": {
        const { min } = cached(collectPredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_collectable": {
        const { min } = cached(collectPredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "items_collected": {
        let val = parseFloat(stateSpace?.items_collected ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "dist_x_to_deposit": {
        const { min } = cached(depositPredicate, "x");
        constructedObs.push(min);
        break;
      }

      case "dist_z_to_deposit": {
        const { min } = cached(depositPredicate, "z");
        constructedObs.push(min);
        break;
      }

      case "dist_to_nearest_deposit": {
        const { min } = cached(depositPredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_deposit": {
        const { min } = cached(depositPredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_deposit": {
        const { min } = cached(depositPredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "items_deposit": {
        let val = parseFloat(stateSpace?.items_deposited ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
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
