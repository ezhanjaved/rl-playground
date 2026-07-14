import numpy as np

BEHAVIOR_ACTIONS = {
    "Collect": ["collect"],
    "Deposit": ["deposit"],
    "Holding": ["pick", "drop"],
    "Open": ["open"],
    "Destroy": ["destroy"],
    "Find": ["interact"],
    "Football": ["kick"]
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
        "Footballer": ["kick"],
    }

    ORDER = [
        "Moveable",
        "Finder",
        "Collector",
        "Holder",
        "Depositor",
        "Destroyer",
        "Opener",
        "Footballer",
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


def actionMaskingArray(mask, action_list, current_behavior, current_obs, cap):
    for action in ("move_up", "move_right", "move_left", "idle"):
        if action in action_list:
            mask[action_list.index(action)] = True

    mask[3] = False # making idle False

    current_dist_to_goal = current_obs[
        0
    ]  # it would be normalized - every obs is made with behavior in mind and first thing in all is current_dist_to_goal
    current_dist_to_goal = current_dist_to_goal * 40.0

    is_path_blocked = 0.0
    if "Navigator" in cap:
        is_path_blocked = current_obs[-1]

    for action in BEHAVIOR_ACTIONS.get(current_behavior, []):
        if action in action_list:
            # drop is only action that cannot be restriced based on distance
            if action == "drop":
                mask[action_list.index(action)] = False
            elif (
                current_dist_to_goal
                < 2.0 and current_behavior != "Football"
                # This is to ensure that collect, destory, deposit, open actions are only available to agent when it is actually in radius to perform them.
            ):  # I have used 2.0 radius for every actuator in engine
                mask = mask_movement_action_in_radius(mask)
                mask[action_list.index(action)] = True
            elif (current_dist_to_goal < 1.0 and current_behavior == "Football"):
                mask[action_list.index(action)] = True

    return mask


def mask_movement_action_in_radius(mask):
    for i in range(4):
        mask[i] = False  # 0,1,2,3
    return mask
