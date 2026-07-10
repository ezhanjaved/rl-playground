from server.training.bulletWorld import PyBulletWorld
from server.training.enviornmentBase import EnvironmentCore
from server.utilities.refined import actionMasking, actionMaskingArray


class SimulationEnv:
    def __init__(self, scenario, runtime_state):
        # runtime is mutable config
        # scenario is immutable
        self.core = EnvironmentCore(scenario, runtime_state)  # Logic handling
        self.world = PyBulletWorld()  # Physics handling

    def reset(self):
        self.core.reset()
        self.world.load()
        runtime = self.core.runtime
        self.agent_id = runtime.agents_ids[0]
        self.topographyFixed = runtime.topographyFixed
        self.randomizer_mode = runtime.randomizerMode
        self.jitter_radius = runtime.jitter_radius
        self.obstacle_mode = runtime.obstacle_mode
        print("Topo Mode:", self.topographyFixed)
        episode = runtime.episode_count
        threshold = runtime.randomSpawnAfterEp
        if runtime.spawn_mode == "Curriculum" and threshold is not None:
            effective_mode = "Random" if episode >= threshold else "Fixed"
        else:
            effective_mode = runtime.spawn_mode
        self.world.spawn_entities(
            self.core.runtime.entities.values(),
            self.core.runtime.highest_dist,
            effective_mode,
            self.topographyFixed,
            self.randomizer_mode,
            self.jitter_radius,
            self.obstacle_mode
        )

        self.world.settle()
        self.core.sync_state_from_world(self.world)
        obs = self.core.get_observation()
        return obs

    def step(self, actions):
        obs_before = self.core.get_observation()

        current_behavior = self.core.runtime.entities[self.agent_id].current_behavior
        capabilities = self.core.runtime.entities[self.agent_id].capabilities
        actionList, _ = actionMasking(capabilities)
        mask = [False] * len(actionList)
        # state_space = self.core.runtime.entities[self.agent_id].state_space
        returned_mask = actionMaskingArray(
            mask, actionList, current_behavior, obs_before[self.agent_id], capabilities
        )
        print("Mask: ", returned_mask)
        print("CB: ", current_behavior)

        self.world.apply_actions(actions, self.core.runtime.entities)
        self.world.step_simulation()
        self.core.sync_state_from_world(self.world)
        self.utility_routines()
        obs_after = self.core.get_observation()  # NEW
        self.core.update_previous_distances(
            obs_before, obs_after, actions, self.core.runtime
        )
        reward, terminated, truncated, info = self.core.compute_reward(
            obs_before, obs_after
        )
        return obs_after, reward, terminated, truncated, info

    def utility_routines(self):
        # self.core.runtime.entities contains mutable data about each entity and it is what each actuator use to update/change it during each action so I will use it to change data into OnEnter function
        # I was doing the same on JS (using entities from Zustand store and changing them into call back function)
        # Since self.core.runtime.entities is also used by evaluator (self.core.compute_reward) graph evalualor will always see updated figure to assign reward
        self.world.check_post(
            self.core.runtime.entities
        )  # Once simulation would have been stepped I will check for ball in the goal
        self.world.collision_check_ball_agent(self.core.runtime.entities)
