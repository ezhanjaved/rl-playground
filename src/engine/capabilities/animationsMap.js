const baseAnimations = {
    move_up: 'Walking_A',
    move_down: 'Walking_A',
    move_left: 'Walking_B',
    move_right: 'Walking_B',
    idle: 'Idle_A',
    pick: "PickUp",
    collect: "PickUp",
    drop: "Throw"
};

const animationMap = {
    Mage: { ...baseAnimations },
    Warrior: { ...baseAnimations },
    Minion: { ...baseAnimations },
    Rogue: { ...baseAnimations }
}

export default animationMap;