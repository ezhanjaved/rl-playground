import { getIndexOfObs } from "./getIndex";

const NOT_FOUND = 1.0;

export default function discretizeBehavior(obsVector, behaviorOBSspace = []) {
  let stateKey = "";
  console.log("Desc OBS Vector: ", obsVector)
  console.log("Desc OBS Space: ", behaviorOBSspace);
  const buildKey = (key, string, value) => {
    return key + `${string}:${value}|`;
  };

  behaviorOBSspace.forEach((space) => {
    const index = getIndexOfObs(behaviorOBSspace, space);
    const value = obsVector[index];

    switch (space) {
      // --- Active current goal ---
      case "delta_x_to_current_goal":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : XdirectionBin(value),
        );
        break;

      case "delta_z_to_current_goal":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : ZdirectionBin(value),
        );
        break;

      case "dist_to_current_goal":
        stateKey = buildKey(
          stateKey,
          space,
          value >= NOT_FOUND ? "NONE" : distanceBin(value),
        );
        break;

      case "in_radius_current_goal":
        stateKey = buildKey(stateKey, space, value === 1 ? "YES" : "NO");
        break;

      case "last_action_success":
        stateKey = buildKey(
          stateKey,
          space,
          value === null ? "NONE" : value === 1 ? "YES" : "NO",
        );
        break;

      // --- Progress fields ---
      case "items_collected": //Collect
      case "total_items_collected": //Collect
      case "keys_collected": //Collect
      case "items_deposited": //Deposit
      case "gates_open": //Open
      case "items_destroyed": //Destroyable
      case "my_goals_scored": //Football
      case "team_goals_scored": //Football
      case "team_goals_conceded": //Football
      case "my_own_goals_scored": //Football
        stateKey = buildKey(stateKey, space, itemsBin(value));
        break;

      case "holding": //holding
      case "hasKey": //Opening
      case "targetReached": //Target
        stateKey = buildKey(stateKey, space, value === 1 ? "YES" : "NO");
        break;

      // --- Goal flags ---
      case "goal_is_collectable":
      case "goal_is_holding":
      case "goal_is_deposit":
      case "goal_is_gate":
      case "goal_is_destroyable":
      case "goal_is_target":
      case "goal_is_football":
        stateKey = buildKey(stateKey, space, value === 1 ? "YES" : "NO");
        break;

      case "last_goal_type":
        stateKey = buildKey(
          stateKey,
          space,
          value === null ? "NONE" : value === 1 ? "YES" : "NO",
        );
        break;

      // --- Navigator ---
      case "obstacle_forward":
      case "obstacle_left":
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
        stateKey = buildKey(stateKey, space, numericBin(value));
        break;
    }
  });

  return stateKey;
}

function XdirectionBin(value) {
  if (value < -0.025) return "LEFT";
  if (value > 0.025) return "RIGHT";
  return "CENTER";
}

function ZdirectionBin(value) {
  if (value < -0.025) return "FORWARD";
  if (value > 0.025) return "BEHIND";
  return "INLINE";
}

function distanceBin(distance) {
  if (distance < 0.05) return "VERY_NEAR";
  if (distance < 0.2) return "NEAR";
  if (distance < 0.5) return "MEDIUM";
  if (distance < 0.875) return "FAR";
  return "VERY_FAR";
}

function itemsBin(item) {
  if (item === 0) return "NONE";
  if (item <= 3) return "FEW";
  if (item <= 9) return "HANDFUL";
  return "MANY";
}

function numericBin(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return "NONE";
  }

  const num = Number(value);

  if (num <= 0) return "ZERO";
  if (num < 0.25) return "LOW";
  if (num < 0.75) return "MID";
  return "HIGH";
}
