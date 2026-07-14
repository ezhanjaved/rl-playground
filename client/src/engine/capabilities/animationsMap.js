const baseAnimations = {
  move_up: "Walking_A",
  move_down: "Walking_B",
  move_left: "Walking_B",
  move_right: "Walking_B",
  idle: "Idle_B",
  pick: "PickUp",
  collect: "PickUp",
  drop: "Throw",
  interact: "Interact",
  deposit: "Interact",
  destroy: "Interact",
  kick: "Interact",
};

const animationMap = {
  Mage: { ...baseAnimations },
  Warrior: { ...baseAnimations },
  Minion: { ...baseAnimations },
  Rogue: { ...baseAnimations },
  Ranger: { ...baseAnimations },
  Knight: { ...baseAnimations },
  Barbarian: { ...baseAnimations },
  "Rogue Human": { ...baseAnimations },
  "Giant-Footballer": {...baseAnimations},
};

export default animationMap;
