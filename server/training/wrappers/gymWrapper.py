import gymnasium as gym
import numpy as np
from gymnasium import spaces

from server.utilities.refined import actionTrasnlator, refined, simplify


class GymWrapper(gym.Env):
    def __init__(self, engine):
        super().__init__()

        self.engine = engine

        obs_dict = self.engine.reset()
        if len(obs_dict) != 1:
            raise ValueError("GymWrapper only supports single-agent environments.")

        obs_list, agent_id = simplify(obs_dict)
        self.agent_id = agent_id

        refined_obs, shape = refined(obs_list)
        self.obs_shape = shape

        self.observation_space = spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(self.obs_shape,),
            dtype=np.float32,
        )

        self.action_space = spaces.Discrete(9)

    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed)

        obs_dict = self.engine.reset()

        if len(obs_dict) != 1:
            raise ValueError("GymWrapper only supports single-agent environments.")

        obs_list, agent_id = simplify(obs_dict)

        if agent_id != self.agent_id:
            raise ValueError("Agent ID changed between resets.")

        refined_obs, _ = refined(obs_list)
        refined_obs = np.array(refined_obs, dtype=np.float32)

        return refined_obs  # type: ignore

    def step(self, action):
        action_str = actionTrasnlator(action)
        actionDict = {self.agent_id: action_str}

        obs_dict, rew_dict, ter_dict, tru_dict, info_dict = self.engine.step(actionDict)

        if len(obs_dict) != 1:
            raise ValueError("GymWrapper only supports single-agent environments.")

        obs_list, agent_id = simplify(obs_dict)

        if agent_id != self.agent_id:
            raise ValueError("Agent ID changed between resets.")

        refined_obs, _ = refined(obs_list)
        refined_obs = np.array(refined_obs, dtype=np.float32)

        reward = float(rew_dict[self.agent_id])
        terminated = ter_dict[self.agent_id]
        truncated = tru_dict[self.agent_id]
        info = info_dict[self.agent_id]

        done = terminated or truncated

        return refined_obs, reward, done, info  # type: ignore
