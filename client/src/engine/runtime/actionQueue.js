// actionQueue.js
const pendingActions = new Map();

export function queueAction(action, agentId) {
  pendingActions.set(agentId, action);
}

export function flushActions() {
  const snapshot = new Map(pendingActions);
  pendingActions.clear();
  return snapshot;
}
