import numpy as np

BEHAVIOR_ACTIONS = {
    "Collect": ["collect"],
    "Deposit": ["deposit"],
    "Holding": ["pick", "drop"],
    "Open": ["open"],
    "Destroy": ["destroy"],
    "Find": ["interact"],
}


def simplify(dictType):
    listType = list(dictType.keys())
    selected_agent = listType[0]
    listData = dictType[selected_agent]
    return listData, selected_agent


def refined(obs):
    shape = len(obs)
    newObs = list(obs)  # copy to avoid mutating original
    for i in range(len(newObs)):
        if isinstance(newObs[i], bool):
            newObs[i] = int(newObs[i])
    return newObs, shape


def actionMasking(capabilities):

    CAPABILITY_MAP = {
        "Moveable": ["move_up", "move_left", "move_right", "idle"],
        "Collector": ["collect"],
        "Holder": ["pick", "drop"],
        "Finder": ["interact"],
        "Depositor": ["deposit"],
        "Destroyer": ["destroy"],
        "Opener": ["open"],
    }

    ORDER = [
        "Moveable",
        "Finder",
        "Collector",
        "Holder",
        "Depositor",
        "Destroyer",
        "Opener",
    ]

    actions = []

    for cap in ORDER:
        if cap in capabilities:
            actions.extend(CAPABILITY_MAP[cap])

    # [a1,a2,a3,a4] #4
    return actions, len(actions)


def actionTranslator(action, action_list):
    if isinstance(action, np.ndarray):
        action = action.flatten()[0]
    elif isinstance(action, (list, tuple)):
        action = action[0]

    action = int(action)

    if action < 0 or action >= len(action_list):
        raise ValueError(f"Invalid action index: {action}")

    return action_list[action]


def actionMaskingArray(mask, action_list, current_behavior):
    for action in ("move_up", "move_right", "move_left", "idle"):
        if action in action_list:
            mask[action_list.index(action)] = True

    for action in BEHAVIOR_ACTIONS.get(current_behavior, []):
        if action in action_list:
            mask[action_list.index(action)] = True

    return mask
