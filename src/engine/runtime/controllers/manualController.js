let pendingAction = null;

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  if (e.code === "KeyW") pendingAction = "move_up";
  if (e.code === "KeyA") pendingAction = "move_left";
  if (e.code === "KeyD") pendingAction = "move_right";
  if (e.code === "KeyE") pendingAction = "collect";
  if (e.code === "KeyQ") pendingAction = "pick";
  if (e.code === "KeyR") pendingAction = "drop";
  if (e.code === "KeyT") pendingAction = "deposit";
  if (e.code === "KeyY") pendingAction = "destroy";
  if (e.code === "KeyU") pendingAction = "open";
  if (e.code === "KeyP") pendingAction = "kick";
  if (e.code === "KeyO") pendingAction = "interact";
});

export default function manualController() {
  const action = pendingAction ?? null;
  pendingAction = null;
  return action;
}
