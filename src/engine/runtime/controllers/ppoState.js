// ppoState.js
const pendingAgents = new Set();

export function isPending(agentId) {
  return pendingAgents.has(agentId);
}

export function markPending(agentId) {
  pendingAgents.add(agentId);
}

export function clearPending(agentId) {
  pendingAgents.delete(agentId);
}
