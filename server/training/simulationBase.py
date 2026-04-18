import time

from server.training.bulletWorld import PyBulletWorld
from server.training.enviornmentBase import EnvironmentCore


class SimulationEnv:
    def __init__(self, scenario, runtime_state):
        self.core = EnvironmentCore(scenario, runtime_state)  # Logic handling
        self.world = PyBulletWorld(scenario)  # Physics handling

    def reset(self):
        self.core.reset()
        self.world.load()
        self.world.spawn_entities(self.core.runtime.entities.values())
        self.world.settle()
        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        return obs

    def step(
        self, actions
    ):  # This is main step function it calls functions from both Env Base & PyBullet
        # t0 = time.time()
        self.world.apply_actions(actions, self.core.runtime.entities)
        # t1 = time.time()
        self.world.step_simulation()
        # t2 = time.time()
        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        # t3 = time.time()
        self.core.update_previous_distances(obs, actions, self.core.runtime)
        reward, terminated, truncated, info = self.core.compute_reward(obs)
        # t4 = time.time()
        # print(
        #     f"actions={t1 - t0:.4f} physics={t2 - t1:.4f} obs={t3 - t2:.4f} reward={t4 - t3:.4f}"
        # )
        return obs, reward, terminated, truncated, info
