import copy

from server.engine.eval import evaluator
from server.engine.observationBuilder import buildObs, partition_entities
from server.utilities.previousDist import previousDistanceCorrection


class EnvironmentCore:
    def __init__(self, scenario, runtime_state):
        self.scenario = scenario
        self.runtime = runtime_state

    def reset(self):  # will call it to reset the env - after episode ends
        self.runtime.entities = copy.deepcopy(
            self.scenario.entities
        )  # to make sure entities value are reset in runTime as orignal
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
        entity_buckets = partition_entities(runtimeSnapShot)
        for agent_id in self.runtime.agents_ids:
            agentData = self.runtime.entities[agent_id]  # Single Agent Data
            obs[agent_id] = buildObs(
                agent_id, agentData, runtimeSnapShot, entity_buckets
            )
        return obs

    def update_previous_distances(self, obs, actions, runTime):
        entities = runTime.entities
        for agent_id, action in actions.items():
            agentData = entities[agent_id]
            agentObs = obs[agent_id]
            previousDistanceCorrection(entities, agentObs, action, agentData)

    def compute_reward(self, obs):  # will call it to calculate reward
        runtimeSnap = self.runtime
        for aid, agent_obs in obs.items():
            graph = runtimeSnap.graph_per_agent[aid]
            config = runtimeSnap.assignment_by_agent[aid]
            r, ter, tru, i = evaluator(aid, agent_obs, graph, config, runtimeSnap)
            runtimeSnap.rewards_agent[aid] = r
            runtimeSnap.terminated_agents[aid] = ter
            runtimeSnap.truncated_agents[aid] = tru
            runtimeSnap.info[aid] = i
        return (
            runtimeSnap.rewards_agent,
            runtimeSnap.terminated_agents,
            runtimeSnap.truncated_agents,
            runtimeSnap.info,
        )
