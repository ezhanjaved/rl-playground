import numpy as np


def simplify(dictType):
    listType = list(
        dictType.keys()
    )  # Using dict and turning to array containing agents id
    if len(listType) != 1:
        raise ValueError("GymWrapper only supports single-agent environments.")
    selected_agent = listType[0]  # selecting the first agent
    listData = dictType[
        selected_agent
    ]  # extracting the data of first agent - in obs it would be list - in action it would be a string
    return listData, selected_agent  # returning data with agent id


def refined(obs):
    shape = len(obs)
    newObs = obs
    for i in range(len(newObs)):
        if isinstance(newObs[i], bool):
            newObs[i] = int(newObs[i])
    return newObs, shape


def actionTrasnlator(action):
    actionlist = {
        0: "move_up",
        1: "move_down",
        2: "move_left",
        3: "move_right",
        4: "idle",
        5: "interact",
        6: "pick",
        7: "drop",
        8: "collect",
    }

    if isinstance(action, np.ndarray):
        action = action.flatten()[0]
    elif isinstance(action, (list, tuple)):
        action = action[0]

    action = int(action)

    if action not in actionlist:
        raise ValueError(f"Invalid action: {action}")

    return actionlist[action]
