from training.bulletWorld import PyBulletWorld
from training.enviornmentBase import EnvironmentCore


class SimulationEnv:
    def __init__(self, scenario, runtime_state):
        self.core = EnvironmentCore(scenario, runtime_state)
        self.world = PyBulletWorld(scenario)

    def reset(self):
        self.world.load()
        self.world.spawn_entities(self.core.runtime.entities.values())

        self.core.reset()
        self.core.sync_state_from_world(self.world)

        return self.core.get_observation()

    def step(
        self, actions
    ):  # This is main step function it calls functions from both Env Base & PyBullet
        self.world.apply_actions(actions)
        self.world.step_simulation()

        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        rewards = self.core.compute_reward()
        done, truncated = self.core.is_done()
        self.core.update_counters()

        return obs, rewards, done, truncated
