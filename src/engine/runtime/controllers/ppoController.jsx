import { sendObsToCloud } from "../../../websocket/ccWebsocket";
import { isPending, markPending } from "./ppoState";
export function PPOController(obsVector, agentId) {
  if (isPending(agentId)) return;
  const refinedObs = refineObs(obsVector);
  const session_token = localStorage.getItem("session_token");
  const jwt_token = localStorage.getItem("jwt_token");
  markPending(agentId);
  sendObsToCloud(refinedObs, session_token, jwt_token, agentId);
}

function refineObs(obsVector) {
  return obsVector.map((obs) => (typeof obs === "boolean" ? Number(obs) : obs));
}
