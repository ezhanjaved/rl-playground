import { getIndexOfObs } from "./getIndex";
export default function discretize(obsVector, agent) {
  const agentObsSpace = agent?.observation_space || [];
  let index = null;
  let holderValue = null;
  let stateKey = "";

  const buildKey = (stateKey, string, value) => {
    stateKey += `${string}:${value}|`;
    return stateKey;
  };

  agentObsSpace.forEach((space) => {
    //space could be dist_x_to_target
    index = getIndexOfObs(space);
    switch (space) {
      case "dist_x_to_target":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : directionBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "dist_z_to_target":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : directionBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "dist_to_nearest_target":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : distanceBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "in_target_radius":
        stateKey = buildKey(stateKey, space, obsVector[index]);
        break;
      case "dist_x_to_collect":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : directionBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "dist_z_to_collect":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : directionBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "dist_to_nearest_collectable":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : distanceBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
      case "items_collected":
        holderValue =
          obsVector[index] >= 1e8 ? "NONE" : itemsBin(obsVector[index]);
        stateKey = buildKey(stateKey, space, holderValue);
        break;
    }
  });
  return stateKey;
}

function directionBin(distance) {
  if (distance < 0) {
    //LEFT
    return "LEFT";
  } else if (distance > 1) {
    //RIGHT
    return "RIGHT";
  } else if (distance >= 0 && distance <= 1) {
    //CENTER
    return "CENTER";
  } else {
    //NONE
    return "NONE";
  }
}

function distanceBin(distance) {
  if (distance < 3) {
    return "VERY_NEAR";
  } else if (distance > 3 && distance < 12) {
    return "NEAR";
  } else if (distance > 12 && distance < 48) {
    return "MEDIUM";
  } else if (distance > 96) {
    return "FAR";
  } else {
    return "VERY_FAR";
  }
}

function itemsBin(item) {
  if (item !== 0 && item <= 3) {
    return "FEW";
  } else if (item > 3 && item < 9) {
    return "HANDFUL";
  } else if (item > 9 && item < 27) {
    return "MANY";
  } else {
    return "NONE";
  }
}
