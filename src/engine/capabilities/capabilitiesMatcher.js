export function CapabilityMatcher(action) {
    const actionLibrary = {
        "pick": "Holder",
        "drop": "Holder",
        "move_up": "Moveable",
        "move_down": "Moveable",
        "move_right": "Moveable",
        "move_left": "Moveable",
        "idle": "Moveable"
    }
    return actionLibrary[action]; //If action is pick Holder should be returned!
}