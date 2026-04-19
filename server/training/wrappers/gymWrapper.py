import gymnasium as gym
import numpy as np
from gymnasium import spaces

from server.utilities.refined import actionMasking, actionTranslator, refined, simplify


class GymWrapper(gym.Env):
    def __init__(self, engine, runTimeSnap):
        super().__init__()

        self.engine = engine

        obs_dict = self.engine.reset()
        if len(obs_dict) != 1:
            raise ValueError("GymWrapper only supports single-agent environments.")

        obs_list, agent_id = simplify(obs_dict)
        self.agent_id = agent_id
        self.agent_capabilities = runTimeSnap.entities[self.agent_id].capabilities
        self.action_list, actionNumber = actionMasking(self.agent_capabilities)

        _, shape = refined(obs_list)
        self.obs_shape = shape

        # FIX: observation values are normalized to [-1, 1] or [0, 1] by
        # observationBuilder.py. Using (-inf, inf) prevents SB3 normalization
        # wrappers from working correctly and disables bounds sanity checks.
        self.observation_space = spaces.Box(
            low=-1.0,
            high=1.0,
            shape=(self.obs_shape,),
            dtype=np.float32,
        )

        self.action_space = spaces.Discrete(actionNumber)

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

        return refined_obs, {}  # type: ignore

    def step(self, action):
        action_str = actionTranslator(action, self.action_list)
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

        return refined_obs, reward, terminated, truncated, info  # type: ignore

    def action_masks(self):
        """Return a boolean mask of valid actions for MaskablePPO."""
        return [True] * self.action_space.n

    def render(self):
        pass

    def close(self):
        self.engine.world.disconnect()
