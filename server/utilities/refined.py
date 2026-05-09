import numpy as np


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
    }

    ORDER = ["Moveable", "Collector", "Holder", "Finder", "Depositor"]

    actions = []

    for cap in ORDER:
        if cap in capabilities:
            actions.extend(CAPABILITY_MAP[cap])

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
