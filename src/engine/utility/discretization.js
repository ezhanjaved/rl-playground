import { getIndexOfObs } from "./getIndex";

const NOT_FOUND = 1.0;

const MAX_DIST = 40.0;

export default function discretize(obsVector, agent) {
  const agentObsSpace = agent?.observation_space || [];
  let stateKey = "";

  const buildKey = (key, string, value) => {
    return key + `${string}:${value}|`;
  };

  agentObsSpace.forEach((space) => {
    const index = getIndexOfObs(space);
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

      // --- Target (Finder) ---
      case "dist_x_to_target":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_z_to_target":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
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
        stateKey = buildKey(stateKey, space, value);
        break;

      // --- Collectable (Collector) ---
      case "dist_x_to_collect":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_z_to_collect":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
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
      case "dist_x_to_pickable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_z_to_pickable":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
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

      // --- Deposit (Depositor) ---
      case "dist_x_to_deposit":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_z_to_deposit":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
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

      // --- Obstacle (Navigator) ---
      case "dist_x_to_obstacle":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_z_to_obstacle":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : directionBin(value),
        );
        break;
      case "dist_to_nearest_obstacle":
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

// Normalized direction: negative = one side, positive = other, ~0 = aligned
function directionBin(value) {
  if (value < -0.025) return "LEFT"; // normalized: ~-1 unit
  if (value > 0.025) return "RIGHT"; // normalized: ~+1 unit
  return "CENTER";
}

// Normalized distance bins (divide world-unit thresholds by MAX_DIST=40)
function distanceBin(distance) {
  if (distance < 0.05) return "VERY_NEAR"; // < 2 world units
  if (distance < 0.2) return "NEAR"; // 2–8 world units
  if (distance < 0.5) return "MEDIUM"; // 8–20 world units
  if (distance < 0.875) return "FAR"; // 20–35 world units
  return "VERY_FAR"; // 35–40+ world units
}

// Position bin — agent's own position normalized by MAX_DIST
function positionBin(value) {
  if (value < -0.5) return "FAR_NEG";
  if (value < -0.25) return "NEG";
  if (value < 0.25) return "CENTER";
  if (value < 0.5) return "POS";
  return "FAR_POS";
}

// Rotation bin — normalized to [-1, 1]
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
