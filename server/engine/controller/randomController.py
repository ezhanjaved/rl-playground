import random


def random_controller(obs, runTimeState):
    actions = {}
    for agent_id, agent_obs in obs.items():
        action_space = runTimeState.entities[agent_id].action_space
        actionPicked = random.choice(action_space)
        actions[agent_id] = actionPicked
    return actions
