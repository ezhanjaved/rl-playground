import { getIndexOfObs } from "./getIndex";

const NOT_FOUND = 1.0;

export default function discretize(obsVector, agent) {
  const agentObsSpace = agent?.observation_space || [];
  let stateKey = "";

  const buildKey = (key, string, value) => {
    return key + `${string}:${value}|`;
  };

  agentObsSpace.forEach((space) => {
    const index = getIndexOfObs(agentObsSpace, space);
    const value = obsVector[index];

    switch (space) {
      // --- Agent self-awareness (Moveable) ---
      case "agent_pos_x":
        stateKey = buildKey(stateKey, space, positionBin(value));
        break;
      case "agent_pos_z":
        stateKey = buildKey(stateKey, space, positionBin(value));
        break;
      case "agent_rotation_y":
        stateKey = buildKey(stateKey, space, rotationBin(value));
        break;

      // --- Temporal Memory ---
      case "last_action_counter":
        stateKey = buildKey(stateKey, space, streakBin(value));
        break;

      // --- Target (Finder) ---
      case "delta_x_to_target":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;
      case "delta_z_to_target":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : ZdirectionBin(value),
        );
        break;
      case "dist_to_nearest_target":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;

      case "in_target_radius":
        console.log("IN TARGET RADIUS: ", value);
        stateKey = buildKey(stateKey, space, value);
        break;

      // --- Collectable (Collector) ---
      case "delta_x_to_collectable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;
      case "delta_z_to_collectable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;
      case "dist_to_nearest_collectable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "items_collected":
        stateKey = buildKey(stateKey, space, itemsBin(value));
        break;

      // --- Pickable (Holder) ---
      case "delta_x_to_pickable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;
      case "delta_z_to_pickable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : ZdirectionBin(value),
        );
        break;
      case "dist_to_nearest_pickable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "holding":
        stateKey = buildKey(stateKey, space, value === 1 ? "YES" : "NO");
        break;
      case "lastPickSuccess":
        stateKey = buildKey(
          stateKey,
          space,
          value === null ? "NONE" : value === 1 ? "YES" : "NO",
        );
        break;

      // --- Deposit (Depositor) ---
      case "delta_x_to_deposit":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;
      case "delta_z_to_deposit":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : ZdirectionBin(value),
        );
        break;
      case "dist_to_nearest_deposit":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "items_deposit":
        stateKey = buildKey(stateKey, space, itemsBin(value));
        break;
      case "last_deposit_success":
        stateKey = buildKey(
          stateKey,
          space,
          value === null ? "NONE" : value === 1 ? "YES" : "NO",
        );
        break;

      // --- Obstacle (Navigator) ---
      case "obstacle_forward":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "obstacle_left":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "obstacle_right":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;
      case "obstacle_in_path":
        stateKey = buildKey(stateKey, space, value === 1 ? "YES" : "NO");
        break;

      default:
        break;
    }
  });

  return stateKey;
}

function XdirectionBin(value) {
  if (value < -0.025) return "LEFT"; // normalized: ~-1 unit
  if (value > 0.025) return "RIGHT"; // normalized: ~+1 unit
  return "CENTER";
}

function ZdirectionBin(value) {
  if (value < -0.025) return "FORWARD"; // normalized: ~-1 unit
  if (value > 0.025) return "BEHIND"; // normalized: ~+1 unit
  return "INLINE";
}

function distanceBin(distance) {
  if (distance < 0.05) return "VERY_NEAR"; // < 2 world units
  if (distance < 0.2) return "NEAR"; // 2–8 world units
  if (distance < 0.5) return "MEDIUM"; // 8–20 world units
  if (distance < 0.875) return "FAR"; // 20–35 world units
  return "VERY_FAR"; // 35–40+ world units
}

function positionBin(value) {
  if (value < -0.5) return "FAR_NEG";
  if (value < -0.25) return "NEG";
  if (value < 0.25) return "CENTER";
  if (value < 0.5) return "POS";
  return "FAR_POS";
}

function rotationBin(value) {
  if (value < -0.5) return "LEFT";
  if (value > 0.5) return "RIGHT";
  return "FORWARD";
}

function itemsBin(item) {
  if (item === 0) return "NONE";
  if (item <= 3) return "FEW";
  if (item <= 9) return "HANDFUL";
  return "MANY";
}

function streakBin(value) {
  if (value <= 1) return "NEW"; // just switched or first step
  if (value <= 3) return "SHORT"; // 2–3 steps
  if (value <= 8) return "MEDIUM"; // 4–8 steps
  return "LONG"; // 9+ steps — likely stuck or repeating
}
