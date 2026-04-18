import numpy as np
from stable_baselines3.common.callbacks import BaseCallback

from server.database.update import update_model


class RewardLoggerCallback(BaseCallback):
    """
    Logs episode rewards and PPO rollout metrics to Supabase.

    Threading removed — SubprocVecEnv runs this callback in the main process
    so there's no pickling issue, but threading.Lock is not pickle-safe if
    the callback were ever moved into a subprocess. Writes are batched per
    rollout (every n_steps) which is frequent enough without a flush thread.
    """

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

        if rewards is not None and len(rewards) > 0:
            self._current_episode_reward += float(np.mean(rewards))

        if dones is not None and len(dones) > 0 and any(dones):
            # With SubprocVecEnv multiple envs can finish simultaneously
            n_done = int(np.sum(dones))
            self._episode_count += n_done
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
        data = {
            "rollout_count": self._rollout_count,
            "mean_advantage": round(float(np.mean(advantages)), 4),
            "mean_return": round(float(np.mean(returns)), 4),
            "mean_value": round(float(np.mean(values)), 4),
            "mean_rollout_reward": round(float(np.mean(rewards)), 4),
        }

        for key, col in [
            ("train/clip_fraction", "clip_fraction"),
            ("train/entropy_loss", "entropy_loss"),
            ("train/policy_loss", "policy_loss"),
            ("train/value_loss", "value_loss"),
            ("train/approx_kl", "approx_kl"),
        ]:
            val = kv.get(key)
            if val is not None:
                data[col] = round(float(val), 4)

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
