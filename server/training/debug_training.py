from server.engine.controller.randomController import (
    heuristic_controller,
    random_controller,
)
from server.training.simulationBase import SimulationEnv


def debugPipeline(scenario, runTimeState, uid):
    print("MODEL ID: ", uid)
    env = SimulationEnv(scenario, runTimeState)

    num_episodes = 1
    max_steps_per_episode = 500

    for episode in range(num_episodes):
        print(f"\n=== Episode Number: {episode} ===")
        obs = env.reset()
        print("Initial Obs: ", obs)

        for step in range(max_steps_per_episode):
            actions = heuristic_controller(obs, runTimeState)
            obs, reward, terminated, truncated, info = env.step(actions)

            print(f"  Step {step} | Action taken: {actions}")
            print("  Next OBS: ", obs)
            print("  Reward: ", reward)
            print("  Terminated: ", terminated)
            print("  Truncated: ", truncated)
            print()
            if any(terminated.values()) or any(truncated.values()):
                print(f"  >> Episode ended at step {step}")
                print()
                break
