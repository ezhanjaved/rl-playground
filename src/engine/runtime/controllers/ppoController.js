import { sendObsToCloud } from "../../../websocket/ccWebsocket";
import { isPending, markPending } from "./ppoState";

export function PPOController(obsVector, agentId) {
  if (isPending(agentId)) return; // don't flood the pod
  const refinedObs = refineObs(obsVector);
  let session_token = null;
  let jwt_token = null;
  try {
    session_token = localStorage.getItem("session_token");
    jwt_token = localStorage.getItem("jwt_token");
  } catch (e) {
    console.warn("localStorage unavailable:", e);
  }
  markPending(agentId);
  sendObsToCloud(refinedObs, session_token, jwt_token, agentId);
}

function refineObs(obsVector) {
  return obsVector.map((obs) => (typeof obs === "boolean" ? Number(obs) : obs));
}
