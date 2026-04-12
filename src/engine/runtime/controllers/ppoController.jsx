import { sendObsToCloud } from "../../../websocket/ccWebsocket";
export function PPOController(obsVector) {
  const refinedObs = refineObs(obsVector);
  const session_token = localStorage.getItem("session_token");
  const jwt_token = localStorage.getItem("jwt_token");
  sendObsToCloud(refinedObs, session_token, jwt_token);
}

function refineObs(obsVector) {
  obsVector.forEach((obs, index) => {
    const typeOfObs = typeof obs;
    if (typeOfObs === "boolean") {
      obsVector[index] = Number(obsVector[index]);
    }
  });
  return obsVector;
}
