// Build obs vectors from entity + registry
import { useSceneStore } from "../../stores/useSceneStore";
import getNearestTargetInfo from "../utility/nearByObjects";
import distance3D from "../utility/3dDistance";
import { obstacleAvoid } from "../utility/obstacleAvoidance";
import { isAlignedToGoal, BallToGoal } from "../utility/footballRef";
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

const destroyablePredicate = (e) =>
  e.isDestroyable === true ||
  e.isDestroyable === "true" ||
  e.isDestroyable === 1;

const gatePredicate = (e) =>
  e.isGate === true || e.isGate === "true" || e.isGate === 1;

const BlueGoalPostPredicate = (e) =>
  e.isGoalPostBlue === true ||
  e.isGoalPostBlue === "true" ||
  e.isGoalPostBlue === 1;

const RedGoalPostPredicate = (e) =>
  e.isGoalPostRed === true ||
  e.isGoalPostRed === "true" ||
  e.isGoalPostRed === 1;

const ballPredicate = (e) =>
  e.isBall === true || e.isBall === "true" || e.isBall === 1;

export function distanceInDirection(
  position,
  rotation,
  directionAngleOffset,
  entities,
  predicate,
) {
  const ry = rotation?.[1] ?? 0;
  const angle = ry + directionAngleOffset;

  const Fx = Math.sin(angle);
  const Fz = Math.cos(angle);

  const coneHalfAngle = Math.PI / 4;
  const maxRange = 5.0;

  let minDist = maxRange;

  for (const entity of Object.values(entities)) {
    if (!entity || !predicate(entity)) continue;
    const [ox, , oz] = entity?.position ?? [0, 0, 0];
    const [ax, , az] = position;

    const dx = ox - ax;
    const dz = oz - az;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > maxRange) continue;

    // Check if obstacle falls within this direction's cone
    const forwardDot = dx * Fx + dz * Fz;
    if (forwardDot <= 0) continue;

    const angle = Math.acos(Math.min(forwardDot / dist, 1.0));
    if (angle <= coneHalfAngle) {
      minDist = Math.min(minDist, dist);
    }
  }

  return minDist / maxRange; // normalized 0-1
}

const getTargetDirectionObs = (targetObjPos, position, rotation) => {
  const worldDx = targetObjPos[0] - position[0];
  const worldDz = targetObjPos[2] - position[2];

  const theta = rotation[1] ?? 0;

  const cos = Math.cos(theta);
  const sin = Math.sin(theta);

  const localSide = cos * worldDx - sin * worldDz;
  const localDepth = sin * worldDx + cos * worldDz;

  const angleToTarget = Math.atan2(localSide, localDepth);

  return {
    sideSignal: Math.sin(angleToTarget), // + left, - right
    depthSignal: Math.cos(angleToTarget), // + forward, - behind
    angleToTarget,
    localSide,
    localDepth,
  };
};

export function nearestDistance(position, rotation, predicate, mode, entities) {
  // For delta modes, find the nearest entity by 3D distance first,
  // then return its directional signal. Mirrors Python observationBuilder.py.
  if (mode === "x-delta" || mode === "z-delta") {
    let minDist = Infinity;
    let nearestPos = null;
    let found = false;

    for (const entity of Object.values(entities)) {
      if (!entity || !predicate(entity)) continue;
      const targetObjPos = entity?.position ?? [0, 0, 0];
      const d = distance3D(position, targetObjPos);
      if (Number.isFinite(d) && d < minDist) {
        minDist = d;
        nearestPos = targetObjPos;
        found = true;
      }
    }

    if (!found) {
      return { min: 1.0, minPos: [] };
    }

    const obs = getTargetDirectionObs(nearestPos, position, rotation);
    const signal = mode === "x-delta" ? obs.sideSignal : obs.depthSignal;
    return { min: Math.fround(signal), minPos: nearestPos };
  }

  let minDist = Infinity;
  let minPos = [];
  let found = false;

  for (const entity of Object.values(entities)) {
    if (!entity) continue;
    if (!predicate(entity)) continue;

    const targetObjPos = entity?.position ?? [0, 0, 0];
    let d;

    if (mode === "both") {
      d = Math.fround(distance3D(position, targetObjPos));
    } else if (mode === "x") {
      d = Math.abs(position?.[0] - targetObjPos?.[0]);
    } else if (mode === "z") {
      d = Math.abs(position?.[2] - targetObjPos?.[2]);
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

  //This section is for Football Ability
  const teamId = agent?.teamId || null;
  let predicatePickedForPost = null;
  let predicatePickedForMyOwnPost = null;
  let flag = null;
  if (teamId) {
    predicatePickedForPost =
      teamId === "blue" ? RedGoalPostPredicate : BlueGoalPostPredicate;
    flag = teamId === "blue" ? "isGoalPostRed" : "isGoalPostBlue";
  }
  if (teamId) {
    predicatePickedForMyOwnPost =
      teamId === "red" ? RedGoalPostPredicate : BlueGoalPostPredicate;
  }

  const constructedObs = [];
  const cached = makeCache(position, rotation, entities);

  for (const obsVar of obs) {
    switch (obsVar) {
      // --- (Moveable) ---
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

      // --- (TemporalMemory) ---
      case "last_action": {
        const idx = stateSpace?.last_action_index ?? 0;
        const totalActions = agent?.action_space?.length ?? 1;
        constructedObs.push(idx / Math.max(totalActions - 1, 1));
        break;
      }

      case "last_action_counter": {
        let idx = stateSpace?.last_action_counter ?? 0;
        idx = Math.min(idx / 10.0, 1.0);
        constructedObs.push(idx);
        break;
      }

      // --- (Navigator) ---
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

      case "obstacle_forward":
        constructedObs.push(
          distanceInDirection(
            position,
            rotation,
            0,
            entities,
            obstaclePredicate,
          ),
        );
        break;
      case "obstacle_left":
        constructedObs.push(
          distanceInDirection(
            position,
            rotation,
            Math.PI / 2,
            entities,
            obstaclePredicate,
          ),
        );
        break;
      case "obstacle_right":
        constructedObs.push(
          distanceInDirection(
            position,
            rotation,
            -Math.PI / 2,
            entities,
            obstaclePredicate,
          ),
        );
        break;

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

      // --- (Finder) ---
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

      // --- (Holder) ---
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

      case "in_radius_holder": {
        const info = getNearestTargetInfo(position, entities, "isPickable");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      //Shared by both Collector & Holder
      case "lastPickSuccess": {
        const lps = stateSpace?.lastPickSuccess;
        const val = lps === null || lps === undefined ? 0.5 : lps ? 1 : 0;
        constructedObs.push(val);
        break;
      }

      // --- (Collector) ---
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

      case "keys_collected": {
        let val = parseFloat(stateSpace?.keys_collected ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "total_items_collected": {
        let val = parseFloat(stateSpace?.total_items_collected ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "in_radius_collect": {
        const info = getNearestTargetInfo(position, entities, "isCollectable");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      // --- (Depositor) ---
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

      case "items_deposited": {
        let val = parseFloat(stateSpace?.items_deposited ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "in_radius_deposit": {
        const info = getNearestTargetInfo(position, entities, "isDeposit");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "last_deposit_success": {
        // null = never tried (0.5), true = success (1), false = failed (0)
        const lds = stateSpace?.lastDepositSuccess;
        const val = lds === null || lds === undefined ? 0.5 : lds ? 1 : 0;
        constructedObs.push(val);
        break;
      }

      // --- (Destroyer) ---
      case "dist_to_nearest_destroyable": {
        const { min } = cached(destroyablePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_destroyable": {
        const { min } = cached(destroyablePredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_destroyable": {
        const { min } = cached(destroyablePredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "items_destroyed": {
        let val = parseFloat(stateSpace?.items_destroyed ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "in_radius_destroyed": {
        const info = getNearestTargetInfo(position, entities, "isDestroyable");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "last_destroy_success": {
        // null = never tried (0.5), true = success (1), false = failed (0)
        const lds = stateSpace?.lastDestroySuccess;
        const val = lds === null || lds === undefined ? 0.5 : lds ? 1 : 0;
        constructedObs.push(val);
        break;
      }

      // --- (Opener) ---
      case "dist_to_nearest_gate": {
        const { min } = cached(gatePredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_gate": {
        const { min } = cached(gatePredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_gate": {
        const { min } = cached(gatePredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "in_radius_gate": {
        const info = getNearestTargetInfo(position, entities, "isGate");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "hasKey": {
        const keyPresent = stateSpace?.keys_collected > 0;
        constructedObs.push(keyPresent ? 1 : 0);
        break;
      }

      case "gates_open": {
        let val = parseFloat(stateSpace?.gates_open ?? 0);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "last_open_success": {
        // null = never tried (0.5), true = success (1), false = failed (0)
        const lds = stateSpace?.lastOpenSuccess;
        const val = lds === null || lds === undefined ? 0.5 : lds ? 1 : 0;
        constructedObs.push(val);
        break;
      }

      // --- (Footballer) ---
      case "dist_to_nearest_ball": {
        const { min } = cached(ballPredicate, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_ball": {
        const { min } = cached(ballPredicate, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_ball": {
        const { min } = cached(ballPredicate, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "in_radius_ball": {
        const info = getNearestTargetInfo(position, entities, "isBall");
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "dist_to_target_goal": {
        const { min } = cached(predicatePickedForPost, "both");
        constructedObs.push(min);
        break;
      }

      case "delta_x_to_goal": {
        const { min } = cached(predicatePickedForPost, "x-delta");
        constructedObs.push(min);
        break;
      }

      case "delta_z_to_goal": {
        const { min } = cached(predicatePickedForPost, "z-delta");
        constructedObs.push(min);
        break;
      }

      case "in_radius_goal": {
        const info = getNearestTargetInfo(position, entities, flag);
        const targetReached = info?.found && info?.distance <= info?.radius;
        constructedObs.push(targetReached ? 1 : 0);
        break;
      }

      case "alignment_to_goal": {
        const { min: delta_x } = cached(predicatePickedForPost, "x-delta");
        const { min: delta_z } = cached(predicatePickedForPost, "z-delta");
        const aligned = isAlignedToGoal(delta_x, delta_z);
        console.log("Aligned: ", aligned);
        constructedObs.push(aligned ? 1 : 0);
        break;
      }

      case "ball_dist_to_own_goal": {
        const { min: delta_x_b } = cached(ballPredicate, "x-delta");
        const { min: delta_z_b } = cached(ballPredicate, "z-delta");
        const { min: delta_x_p } = cached(
          predicatePickedForMyOwnPost,
          "x-delta",
        );
        const { min: delta_z_p } = cached(
          predicatePickedForMyOwnPost,
          "z-delta",
        );
        const distance = BallToGoal(
          delta_x_b,
          delta_z_b,
          delta_x_p,
          delta_z_p,
          "distance-only",
        );
        console.log("Distance Of Ball to Post: ", distance);
        constructedObs.push(distance);
        break;
      }

      case "ball_in_own_goal_danger_zone": {
        const { min: delta_x_b } = cached(ballPredicate, "x-delta");
        const { min: delta_z_b } = cached(ballPredicate, "z-delta");
        const { min: delta_x_p } = cached(
          predicatePickedForMyOwnPost,
          "x-delta",
        );
        const { min: delta_z_p } = cached(
          predicatePickedForMyOwnPost,
          "z-delta",
        );
        const isInDanger = BallToGoal(
          delta_x_b,
          delta_z_b,
          delta_x_p,
          delta_z_p,
          "danger-check",
        );
        console.log("Danger?: ", isInDanger);
        constructedObs.push(isInDanger ? 1 : 0);
        break;
      }

      case "last_kick_success": {
        // null = never tried (0.5), true = success (1), false = failed (0)
        const lds = stateSpace?.lastKickSuccess;
        const val = lds === null || lds === undefined ? 0.5 : lds ? 1 : 0;
        constructedObs.push(val);
        break;
      }

      case "my_goals_scored": {
        let val = parseFloat(stateSpace?.my_goals_scored);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "my_own_goals_scored": {
        let val = parseFloat(stateSpace?.my_own_goals_scored);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "team_goals_scored": {
        let val = parseFloat(stateSpace?.team_goals_scored);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "team_goals_conceded": {
        let val = parseFloat(stateSpace?.team_goals_conceded);
        val = Math.min(val / 10.0, 1.0);
        constructedObs.push(val);
        break;
      }

      case "last_goal_type": {
        // null = none (0.5), true = normal_goal (1), false = own_goal (0)
        const lds = stateSpace?.last_goal_type;
        const val = lds === null || lds === undefined ? 0.5 : lds ? 1 : 0;
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
