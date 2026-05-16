import os

import numpy as np
from stable_baselines3.common.callbacks import BaseCallback

from server.database.update import update_model
from server.storage.uploadModel import uploadCheckpoint


class RewardLoggerCallback(BaseCallback):
    def __init__(
        self,
        training_id: str,
        checkpoint_dir: str,
        log_every_n: int = 1,
        flush_every_n_episodes: int = 50,
        flush_every_n_rollouts: int = 10,
        verbose: int = 0,
    ):
        super().__init__(verbose)
        self.training_id = training_id
        self.checkpoint_dir = checkpoint_dir
        self.log_every_n = log_every_n
        self.flush_every_n_episodes = flush_every_n_episodes
        self.flush_every_n_rollouts = flush_every_n_rollouts

        self._episode_count = 0
        self._rollout_count = 0
        self._checkpoint_count = 0
        self._all_rewards = []
        self._last_uploaded_checkpoint: str | None = None

        # Track how many ep_info_buffer entries we've already processed
        self._total_episodes_seen = 0

        # In-memory buffer — holds the latest state to flush
        self._pending: dict = {}

    def _buffer(self, data: dict):
        """Merge data into the pending buffer (latest value wins)."""
        self._pending.update(data)

    def _flush(self):
        """Write the buffered data to Supabase and clear the buffer."""
        if not self._pending:
            return
        update_model(
            id=self.training_id,
            data=self._pending.copy(),
            table="models",
            id_name="training_id",
        )
        self._pending.clear()

    def _upload_latest_checkpoint(self):
        """
        Find the most recently written checkpoint in checkpoint_dir,
        upload it to the bucket, and update the DB checkpoints counter.
        Skips if the latest checkpoint was already uploaded.
        """
        try:
            checkpoints = sorted(
                [f for f in os.listdir(self.checkpoint_dir) if f.endswith(".zip")]
            )
            if not checkpoints:
                return

            latest = checkpoints[-1]

            if latest == self._last_uploaded_checkpoint:
                return

            local_path = os.path.join(self.checkpoint_dir, latest)
            uploadCheckpoint(local_path, self.training_id, latest)

            self._checkpoint_count += 1
            self._last_uploaded_checkpoint = latest

            update_model(
                id=self.training_id,
                data={"checkpoints": self._checkpoint_count},
                table="models",
                id_name="training_id",
            )
            print(f"Checkpoint uploaded: {latest} (total: {self._checkpoint_count})")

        except Exception as e:
            print(f"Checkpoint upload failed (non-fatal): {e}")

    def _on_step(self) -> bool:
        return True

    def _on_rollout_end(self) -> None:
        self._rollout_count += 1

        ep_info_buffer = self.model.ep_info_buffer
        total_seen = self.model._episode_num
        # Use buffer length delta instead of _episode_num
        new_count = total_seen - self._total_episodes_seen

        if new_count > 0:
            new_entries = ep_info_buffer[-min(new_count, len(ep_info_buffer)) :]
            for ep_info in new_entries:
                self._episode_count += 1
                self._all_rewards.append(float(ep_info.get("r", 0.0)))

            self._total_episodes_seen = total_seen  # always moves forward
            smoothed = float(np.mean(self._all_rewards[-10:]))
            self._buffer(
                {
                    "current_episode": self._episode_count,
                    "current_timestep": self.num_timesteps,
                    "last_episode_reward": round(self._all_rewards[-1], 4),
                    "smoothed_reward": round(smoothed, 4),
                    "status": "training",
                }
            )

        # --- Rollout buffer stats ---
        buf = self.model.rollout_buffer
        data = {
            "rollout_count": self._rollout_count,
            "mean_advantage": round(float(np.mean(buf.advantages.flatten())), 4),
            "mean_return": round(float(np.mean(buf.returns.flatten())), 4),
            "mean_value": round(float(np.mean(buf.values.flatten())), 4),
            "mean_rollout_reward": round(float(np.mean(buf.rewards.flatten())), 4),
        }

        kv = self.model.logger.name_to_value
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

        self._buffer(data)
        self._flush()
        self._upload_latest_checkpoint()

    def _on_training_end(self) -> None:
        final_mean = (
            float(np.mean(self._all_rewards[-10:])) if self._all_rewards else 0.0
        )
        self._buffer(
            {
                "status": "complete",
                "total_episodes": self._episode_count,
                "final_mean_reward": round(final_mean, 4),
            }
        )
        self._flush()
