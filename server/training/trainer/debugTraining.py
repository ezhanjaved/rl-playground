from engine.controller.randomController import random_controller

from server.training.simulationBase import SimulationEnv


def debugPipeline(scenario, runTimeState):
    env = SimulationEnv(scenario, runTimeState)
    obs = env.reset()  # OBS: {agent_id: [obs_vector], agent_id: [obs_vector]}
    for _ in range(1000):
        actions = random_controller(
            obs, runTimeState
        )  # Actions: {agent_id: actionPicked, agent_id: actionPicked}
        obs, reward, terminated, truncated, info = env.step(actions)
