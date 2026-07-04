import functools

import numpy as np
from gymnasium.spaces import Box, Dict, Discrete, MultiBinary
from pettingzoo import ParallelEnv

from server.utilities.refined import actionMaskingArray, actionTranslator


class PettingZooWrapper(ParallelEnv):
    metadata = {"name": "rl_playground_parallel_v0"}

    def __init__(self, engine, runTimeSnap):
        super().__init__()

        self.engine = engine

        self.possible_agents = list(runTimeSnap.agents_ids)
        self.entities = runTimeSnap.entities

        self.agents = []

        self.render_mode = None

        self.global_action_list = [
            "move_up",
            "move_left",
            "move_right",
            "idle",
            "interact",
            "collect",
            "pick",
            "drop",
            "deposit",
            "destroy",
            "open",
        ]

        global_obs_size, global_obs = self.calculate_global_obs(
            self.entities, self.possible_agents
        )

        self.global_obs_space = global_obs
        self.global_obs_dim = global_obs_size

        self.global_obs_index = {
            obs_key: i for i, obs_key in enumerate(self.global_obs_space)
        }

    def reset(self, seed=None, options=None):
        self.agents = self.possible_agents[:]

        raw_obs_dict = self.engine.reset()

        obs_dict = {
            agent_id: self._pad_or_build_obs(agent_id, raw_obs_dict[agent_id])
            for agent_id in self.agents
        }

        infos = {agent_id: {} for agent_id in self.agents}

        return obs_dict, infos

    def step(self, actions):
        action_dict = {}

        for agent_id in self.agents:
            action_int = int(actions[agent_id])
            mask = self.get_action_mask(agent_id)
            if not mask[action_int]:
                action_int = self.global_action_list.index("idle")

            action_str = actionTranslator(action_int, self.global_action_list)

            action_dict[agent_id] = action_str

        raw_obs_dict, rew_dict, ter_dict, tru_dict, info_dict = self.engine.step(
            action_dict
        )

        obs_dict = {
            agent_id: self._pad_or_build_obs(agent_id, raw_obs_dict[agent_id])
            for agent_id in self.agents
        }

        done_agents = [
            agent_id
            for agent_id in self.agents
            if ter_dict.get(agent_id, False) or tru_dict.get(agent_id, False)
        ]

        for agent_id in done_agents:
            if agent_id in self.agents:
                self.agents.remove(agent_id)

        return obs_dict, rew_dict, ter_dict, tru_dict, info_dict

    def _pad_or_build_obs(self, agent_id, raw_obs):
        agentData = self.entities[agent_id]
        agentOBSspace = agentData.behaviorObs
        obs = np.asarray(raw_obs, dtype=np.float32)

        if len(obs) != len(agentOBSspace):
            raise ValueError(
                f"Observation mismatch for {agent_id}. "
                f"Got obs vector size {len(obs)}, "
                f"but behaviorObs has {len(agentOBSspace)} keys."
            )

        padded = self.pad_agent_obs(agentOBSspace, obs)
        masked_actions = self.get_action_mask(agent_id)
        return {"observation": padded, "action_mask": masked_actions}

    def calculate_global_obs(self, entities, agent_list):
        global_obs_space = []
        seen = set()
        for agentId in agent_list:
            agentData = entities[agentId]
            obsSpace = agentData.behaviorObs
            for ele in obsSpace:
                if ele not in seen:
                    seen.add(ele)
                    global_obs_space.append(ele)

        size = len(global_obs_space)
        return size, global_obs_space

    def pad_agent_obs(self, agentOBSspace, agentOBSvector):
        padded = np.full(self.global_obs_dim, -1.0, dtype=np.float32)
        for local_i, obs_key in enumerate(agentOBSspace):
            if obs_key not in self.global_obs_index:
                raise KeyError(
                    f"Observation key '{obs_key}' for agent does not exist "
                    f"in global_obs_space: {self.global_obs_space}"
                )
            global_i = self.global_obs_index[obs_key]
            padded[global_i] = agentOBSvector[local_i]
        return padded

    def get_action_mask(self, agent_id):
        agent_behavior = self.engine.core.runtime.entities[agent_id].current_behavior
        mask = [False] * len(self.global_action_list)
        masked_actions = actionMaskingArray(
            mask, self.global_action_list, agent_behavior
        )
        masked_actions = np.asarray(masked_actions, dtype=bool)
        if masked_actions.shape != (len(self.global_action_list),):
            raise ValueError(
                f"Action mask for {agent_id} has shape {masked_actions.shape}, "
                f"expected {(len(self.global_action_list),)}."
            )
        return masked_actions

    @functools.lru_cache(maxsize=None)
    def observation_space(self, agent):
        return Dict(
            {
                "observation": Box(
                    low=-1.0,
                    high=1.0,
                    shape=(self.global_obs_dim,),
                    dtype=np.float32,
                ),
                "action_mask": MultiBinary(len(self.global_action_list)),
            }
        )

    @functools.lru_cache(maxsize=None)
    def action_space(self, agent):
        return Discrete(len(self.global_action_list))
