from training.bulletWorld import PyBulletWorld
from training.enviornmentBase import EnvironmentCore


class SimulationEnv:
    def __init__(self, scenario, runtime_state):
        self.core = EnvironmentCore(scenario, runtime_state)  # Logic handling
        self.world = PyBulletWorld(scenario)  # Physics handling

    def reset(self):

        self.core.reset()
        print("Core reset done")

        self.world.load()
        print("World loaded")

        self.world.spawn_entities(self.core.runtime.entities.values())
        print("Entities spawned")

        print("Entity mapping:", self.world.entity_mapping)

        self.core.sync_state_from_world(self.world)
        print("Synced state")

        obs = self.core.get_observation()

        return obs

    def step(
        self, actions
    ):  # This is main step function it calls functions from both Env Base & PyBullet
        self.world.apply_actions(actions, self.core.runtime.entities)
        self.world.step_simulation()

        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        self.core.update_previous_distances(obs, actions, self.core.runtime)
        reward, terminated, truncated, info = self.core.compute_reward(obs)
        return obs, reward, terminated, truncated, info
