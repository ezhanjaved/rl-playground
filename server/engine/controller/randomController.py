import random


def random_controller(obs, runTimeState):
    actions = {}
    for agent_id, _ in obs.items():
        action_space = runTimeState.entities[agent_id].action_space
        actionPicked = random.choice(action_space)
        actions[agent_id] = actionPicked
    return actions


def scripted_controller(obs, step):
    actions = {}

    actionsList = [
        "move_up",
        "move_up",
        "move_up",
        "move_up",
        "move_left",
        "move_left",
        "move_left",
        "move_up",
        "move_up",
        "move_up",
    ]

    if step < len(actionsList):
        actionPicked = actionsList[step]
    else:
        actionPicked = "idle"

    for agent_id, _ in obs.items():
        actions[agent_id] = actionPicked

    return actions
