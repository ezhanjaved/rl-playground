import numpy as np
from stable_baselines3 import PPO

from server.training.simulationBase import SimulationEnv
from server.utilities.refined import actionMasking, actionTranslator

MODEL_PATH = "server/training/model_training_6715a1b8-8375-4f9b-b96d-166c127e3ea2_model_6715a1b8-8375-4f9b-b96d-166c127e3ea2.zip"


def debugPipeline2(scenario, runTimeState, uid):
    print("MODEL ID: ", uid)
    env = SimulationEnv(scenario, runTimeState)

    print(f"Loading model from: {MODEL_PATH}")
    model = PPO.load(MODEL_PATH)
    print("Model loaded successfully.")
    print(f"  Policy:         {model.policy}")
    print(f"  Obs space:      {model.observation_space}")
    print(f"  Action space:   {model.action_space}")

    num_episodes = 2
    max_steps_per_episode = 1500

    for episode in range(num_episodes):
        print(f"\n=== Episode Number: {episode} ===")
        obs = env.reset()
        print("Initial Obs: ", list(obs["entity_2d1fd189-df74-4ae4-a510-883da7e01f92"]))

        for step in range(max_steps_per_episode):
            actions, _ = actionMasking(["Moveable", "Finder"])
            OBS = list(obs["entity_2d1fd189-df74-4ae4-a510-883da7e01f92"])
            np.array(OBS, dtype=np.float32)
            print("OBS: ", OBS)
            action, _ = model.predict(OBS, deterministic=True)
            pickedAction = actionTranslator(action, actions)
            print("Picked Action: ", pickedAction)
            actionDict = {
                "entity_2d1fd189-df74-4ae4-a510-883da7e01f92": str(pickedAction)
            }
            obs, reward, terminated, truncated, info = env.step(actionDict)

            print(f"  Step {step} | Action taken: {action}")
            print("  Next OBS: ", obs)
            print("  Reward:    ", reward)
            print("  Terminated:", terminated)
            print("  Truncated: ", truncated)
            print()

            if any(terminated.values()) or any(truncated.values()):
                print(f"  >> Episode ended at step {step}")
                print()
                break
