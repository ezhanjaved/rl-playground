def capabilityMatcher(action):
    actionLib = {
        "pick": "Holder",
        "drop": "Holder",
        "collect": "Collector",
        "move_up": "Moveable",
        "move_right": "Moveable",
        "move_left": "Moveable",
        "idle": "Moveable",
        "interact": "Finder",
        "deposit": "Depositor",
        "destroy": "Destroyer",
        "open": "Opener",
        "kick": "Footballer",
    }
    return actionLib[action]
