from engine.observationBuilder import buildObs


class EnvironmentCore:
    def __init__(self, scenario, runtime_state):
        self.scenario = scenario
        self.runtime = runtime_state

    def reset(self):  # will call it to reset the env - after episode ends
        self.runtime.step_count = 0
        self.runtime.episode_count += 1
        for aid in self.runtime.agents_ids:
            self.runtime.truncated_agents[aid] = False
            self.runtime.terminated_agents[aid] = False
            self.runtime.rewards_agent[aid] = 0
            self.runtime.episode_reward[aid] = 0

    def sync_state_from_world(
        self, world
    ):  # will call it to sync both runtime & physics
        for agent_id in self.runtime.agents_ids:
            pos, rot = world.get_entity_state(agent_id)
            self.runtime.entities[agent_id].position = pos
            self.runtime.entities[agent_id].rotation = rot

    def get_observation(self):  # will call it to build observation of agents
        obs = {}
        runtimeSnapShot = self.runtime.entities
        for agent_id in self.runtime.agents_ids:
            agentData = self.runtime.entities[agent_id]  # Single Agent Data
            obs[agent_id] = buildObs(agent_id, agentData, runtimeSnapShot)
        return obs

    def compute_reward(self):  # will call it to calculate reward
        pass

    def update_counters(self):
        pass

    def is_done(self):  # will call it to decide if episode has ended
        done = True
        truncated = False
        return done, truncated
