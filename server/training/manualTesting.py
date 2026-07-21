import pybullet as p

from server.training.simulationBase import SimulationEnv


def manualTesting(scenario, runTimeState, uid):
    print("Manual Testing of Model ID: " + uid)
    env = SimulationEnv(scenario, runTimeState)

    num_episodes = 100
    max_steps_per_ep = 2
    current_step = 0

    for episode in range(num_episodes):
        print(f"\n=== Episode Number: {episode} ===")
        obs = env.reset()
        print("Initial Obs: ", obs)
        agentId = next(iter(obs))
        current_step = 0
        while current_step < max_steps_per_ep:
            action = keyboardController()
            actions = {agentId: action}
            if action is not None:
                obs, reward, terminated, truncated, _ = env.step(actions)
                current_step += 1
                print(f"  Step {current_step} | Action taken: {actions}")
                print("  Next OBS: ", obs)
                print("  Reward: ", reward)
                print("  Terminated: ", terminated)
                print("  Truncated: ", truncated)
                print()
                if any(terminated.values()) or any(truncated.values()):
                    print(f"  >> Episode ended at step {current_step}")
                    print()
                    break


def keyboardController():
    keys = p.getKeyboardEvents()
    mode = p.KEY_WAS_TRIGGERED

    if p.B3G_UP_ARROW in keys and keys[p.B3G_UP_ARROW] & mode:
        return "move_up"

    if p.B3G_LEFT_ARROW in keys and keys[p.B3G_LEFT_ARROW] & mode:
        return "move_left"

    if p.B3G_RIGHT_ARROW in keys and keys[p.B3G_RIGHT_ARROW] & mode:
        return "move_right"

    if ord("e") in keys and keys[ord("e")] & p.KEY_WAS_TRIGGERED:
        return "interact"

    if ord("q") in keys and keys[ord("q")] & p.KEY_WAS_TRIGGERED:
        return "collect"

    if ord("a") in keys and keys[ord("a")] & p.KEY_WAS_TRIGGERED:
        return "pick"

    if ord("s") in keys and keys[ord("s")] & p.KEY_WAS_TRIGGERED:
        return "drop"

    if ord("d") in keys and keys[ord("d")] & p.KEY_WAS_TRIGGERED:
        return "deposit"

    if ord("z") in keys and keys[ord("z")] & p.KEY_WAS_TRIGGERED:
        return "destroy"

    if ord("x") in keys and keys[ord("x")] & p.KEY_WAS_TRIGGERED:
        return "open"

    if ord("l") in keys and keys[ord("l")] & p.KEY_WAS_TRIGGERED:
        return "kick"

    return None
