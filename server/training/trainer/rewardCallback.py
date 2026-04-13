import numpy as np
from stable_baselines3.common.callbacks import BaseCallback

from server.database.update import update_model


class RewardLoggerCallback(BaseCallback):
    def __init__(self, training_id: str, log_every_n: int = 1, verbose: int = 0):
        super().__init__(verbose)
        self.training_id = training_id
        self.log_every_n = log_every_n

        self._episode_count = 0
        self._rollout_count = 0
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

    def _on_rollout_end(self) -> None:
        self._rollout_count += 1
        buf = self.model.rollout_buffer

        advantages = buf.advantages.flatten()
        returns = buf.returns.flatten()
        values = buf.values.flatten()
        rewards = buf.rewards.flatten()

        kv = self.model.logger.name_to_value
        clip_fraction = kv.get("train/clip_fraction", None)
        entropy_loss = kv.get("train/entropy_loss", None)
        policy_loss = kv.get("train/policy_loss", None)
        value_loss = kv.get("train/value_loss", None)
        approx_kl = kv.get("train/approx_kl", None)

        data = {
            "rollout_count": self._rollout_count,
            "mean_advantage": round(float(np.mean(advantages)), 4),
            "mean_return": round(float(np.mean(returns)), 4),
            "mean_value": round(float(np.mean(values)), 4),
            "mean_rollout_reward": round(float(np.mean(rewards)), 4),
        }

        if clip_fraction is not None:
            data["clip_fraction"] = round(float(clip_fraction), 4)
        if entropy_loss is not None:
            data["entropy_loss"] = round(float(entropy_loss), 4)
        if policy_loss is not None:
            data["policy_loss"] = round(float(policy_loss), 4)
        if value_loss is not None:
            data["value_loss"] = round(float(value_loss), 4)
        if approx_kl is not None:
            data["approx_kl"] = round(float(approx_kl), 4)

        update_model(
            id=self.training_id,
            data=data,
            table="models",
            id_name="training_id",
        )

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
