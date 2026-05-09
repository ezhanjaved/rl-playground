from server.training.bulletWorld import PyBulletWorld
from server.training.enviornmentBase import EnvironmentCore


class SimulationEnv:
    def __init__(self, scenario, runtime_state):
        self.core = EnvironmentCore(scenario, runtime_state)  # Logic handling
        self.world = PyBulletWorld()  # Physics handling

    def reset(self):
        self.core.reset()
        self.world.load()
        self.world.spawn_entities(self.core.runtime.entities.values())
        self.world.settle()
        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        return obs

    def step(self, actions):
        obs_before = self.core.get_observation()
        self.world.apply_actions(actions, self.core.runtime.entities)
        self.world.step_simulation()
        self.core.sync_state_from_world(self.world)
        self.core.update_previous_distances(obs_before, actions, self.core.runtime)
        obs_after = self.core.get_observation()  # NEW
        reward, terminated, truncated, info = self.core.compute_reward(
            obs_before, obs_after
        )  # NEW
        return obs_after, reward, terminated, truncated, info
