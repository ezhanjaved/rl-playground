from engine.controller.randomController import random_controller
from training.simulationBase import SimulationEnv


def trainingPipeline(scenario, runTimeState):
    env = SimulationEnv(scenario, runTimeState)
    obs = env.reset()  # OBS: {agent_id: [obs_vector], agent_id: [obs_vector]}
    for _ in range(100):
        actions = random_controller(
            obs, runTimeState
        )  # Actions: {agent_id: actionPicked, agent_id: actionPicked}
        obs, reward, done, info = env.step(actions)
