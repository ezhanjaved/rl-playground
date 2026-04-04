def capabilityMatcher(action):
    actionLib = {
        "pick": "Holder",
        "drop": "Holder",
        "collect": "Collector",
        "move_up": "Moveable",
        "move_down": "Moveable",
        "move_right": "Moveable",
        "move_left": "Moveable",
        "idle": "Moveable",
        "interact": "Finder",
    }
    return actionLib[action]
