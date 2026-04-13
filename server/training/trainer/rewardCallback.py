import numpy as np
from stable_baselines3.common.callbacks import BaseCallback

from server.database.update import update_model


class RewardLoggerCallback(BaseCallback):
    def __init__(self, training_id: str, log_every_n: int = 1, verbose: int = 0):
        super().__init__(verbose)
        self.training_id = training_id
        self.log_every_n = log_every_n

        self._episode_count = 0
        self._current_episode_reward = 0.0
        self._all_rewards = []

    def _on_step(self) -> bool:
        rewards = self.locals.get("rewards", [])
        dones = self.locals.get("dones", [])

        if len(rewards) > 0:
            self._current_episode_reward += float(np.mean(rewards))

        if len(dones) > 0 and any(dones):
            self._episode_count += 1
            self._all_rewards.append(self._current_episode_reward)

            if self._episode_count % self.log_every_n == 0:
                smoothed = float(np.mean(self._all_rewards[-10:]))

                update_model(
                    id=self.training_id,
                    data={
                        "current_episode": self._episode_count,
                        "current_timestep": self.num_timesteps,
                        "last_episode_reward": round(self._current_episode_reward, 4),
                        "smoothed_reward": round(smoothed, 4),
                        "status": "training",
                    },
                    table="models",
                    id_name="training_id",
                )

            self._current_episode_reward = 0.0

        return True

    def _on_training_end(self) -> None:
        final_mean = (
            float(np.mean(self._all_rewards[-10:])) if self._all_rewards else 0.0
        )

        update_model(
            id=self.training_id,
            data={
                "status": "complete",
                "total_episodes": self._episode_count,
                "final_mean_reward": round(final_mean, 4),
            },
            table="models",
            id_name="training_id",
        )
