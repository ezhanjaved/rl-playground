const MOVE_KEYS = {
  KeyW: "move_up",
  KeyA: "move_left",
  KeyD: "move_right",
};

const ACTION_KEYS = {
  KeyE: "collect",
  KeyQ: "pick",
  KeyR: "drop",
  KeyT: "deposit",
  KeyY: "destroy",
  KeyU: "open",
  KeyP: "kick",
  KeyO: "interact",
};

const heldMoveKeys = new Set();
let pendingAction = null;

window.addEventListener("keydown", (e) => {
  if (MOVE_KEYS[e.code]) {
    heldMoveKeys.add(e.code);
    return;
  }

  if (ACTION_KEYS[e.code]) {
    if (e.repeat) return; // one-shot: ignore browser auto-repeat
    pendingAction = ACTION_KEYS[e.code];
  }
});

window.addEventListener("keyup", (e) => {
  if (MOVE_KEYS[e.code]) {
    heldMoveKeys.delete(e.code);
  }
});

window.addEventListener("blur", () => {
  heldMoveKeys.clear();
});

export default function manualController() {
  if (pendingAction !== null) {
    const action = pendingAction;
    pendingAction = null;
    return action;
  }

  for (const code of heldMoveKeys) {
    if (MOVE_KEYS[code]) return MOVE_KEYS[code];
  }

  return null;
}
