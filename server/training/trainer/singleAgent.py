import copy
import os

from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import CallbackList, CheckpointCallback
from stable_baselines3.common.monitor import Monitor
from stable_baselines3.common.vec_env import SubprocVecEnv

from server.path_config import MODEL_DIR
from server.storage.uploadModel import downloadLatestCheckpoint
from server.training.trainer.rewardCallback import RewardLoggerCallback

N_ENVS = 8


def make_env(scenario, runtime):

    def _init():
        from server.training.simulationBase import SimulationEnv
        from server.training.wrappers.gymWrapper import GymWrapper

        runtime_copy = copy.deepcopy(runtime)
        env = GymWrapper(SimulationEnv(scenario, runtime_copy), runtime_copy)
        return Monitor(env)

    return _init


class SingleAgentTrainer:
    def __init__(self, training_id, env, assignment, scenario=None, runtime=None):
        self.env = env
        self.scenario = scenario
        self.runtime = runtime
        self.model = None
        self.assignment = assignment.config
        self.training_id = training_id

        self.timesteps = self.assignment.timesteps
        self.gamma = self.assignment.rewardImp
        self.learning_rate = self.assignment.learningSpeed
        self.clip_range = self.assignment.clipRange
        self.gae_lambda = self.assignment.gaeLambda
        self.vf_coef = self.assignment.valLossCf
        self.batch = self.assignment.batch
        self.epoch = self.assignment.epoch
        self.n_steps = self.assignment.n_steps
        self.target_kl = self.assignment.target_kl
        self.ent_coeff = self.assignment.ent_coeff

        if self.learning_rate == "Slow":
            self.learning_rate = 1e-4
        elif self.learning_rate == "Medium":
            self.learning_rate = 3e-4
        elif self.learning_rate == "Fast":
            self.learning_rate = 1e-3

    def train(self):
        self.n_steps = max(512, self.n_steps)
        self.clip_range = max(0.1, min(self.clip_range, 0.3))
        self.gae_lambda = max(0.9, min(self.gae_lambda, 0.98))
        effective_buffer = self.n_steps * N_ENVS
        self.batch = min(self.batch, effective_buffer)
        if effective_buffer % self.batch != 0:
            self.batch = max(
                b for b in range(1, self.batch + 1) if effective_buffer % b == 0
            )

        test_env = make_env(self.scenario, self.runtime)()
        print(
            "Single env test passed:", test_env.observation_space, test_env.action_space
        )
        test_env.close()

        vec_env = SubprocVecEnv(
            [make_env(self.scenario, self.runtime) for _ in range(N_ENVS)],
            start_method="spawn",
        )

        checkpoint_dir = (
            MODEL_DIR / f"model_training_{self.training_id}" / "checkpoints"
        )
        os.makedirs(checkpoint_dir, exist_ok=True)

        resumed_timesteps = 0
        checkpoint_path = downloadLatestCheckpoint(self.training_id, checkpoint_dir)
        if checkpoint_path is not None:
            print(f"Resuming from checkpoint: {checkpoint_path}")
            self.model = PPO.load(str(checkpoint_path), env=vec_env)
            try:
                stem = checkpoint_path.stem
                resumed_timesteps = int(stem.split("_steps")[0].split("_")[-1])
                print(f"Resuming at timestep {resumed_timesteps}")
            except Exception:
                resumed_timesteps = 0
        else:
            print("No checkpoint found, starting fresh.")
            self.model = PPO(
                "MlpPolicy",
                vec_env,
                n_steps=self.n_steps,
                learning_rate=self.learning_rate,
                n_epochs=self.epoch,
                batch_size=self.batch,
                gae_lambda=self.gae_lambda,
                clip_range=self.clip_range,
                vf_coef=self.vf_coef,
                gamma=self.gamma,
                ent_coef=self.ent_coeff,
                verbose=1,
                target_kl=self.target_kl,
                normalize_advantage=True,
            )

        remaining_timesteps = max(self.timesteps - resumed_timesteps, 0)
        if remaining_timesteps == 0:
            print("Training already complete based on checkpoint timestep.")
            vec_env.close()
            return

        checkpoint_callback = CheckpointCallback(
            save_freq=max(10_000 // N_ENVS, self.n_steps),
            save_path=str(checkpoint_dir),
            name_prefix=f"checkpoint_{self.training_id}",
            save_replay_buffer=False,
            save_vecnormalize=False,
        )

        reward_callback = RewardLoggerCallback(
            training_id=self.training_id,
            checkpoint_dir=str(checkpoint_dir),
            log_every_n=1,
        )

        callback = CallbackList([checkpoint_callback, reward_callback])

        self.model.learn(
            total_timesteps=remaining_timesteps,
            callback=callback,
            reset_num_timesteps=resumed_timesteps == 0,
        )
        vec_env.close()

    def save(self, id):
        self.model_file_name = f"model_{id}"
        self.model_dir = MODEL_DIR / f"model_training_{id}"
        os.makedirs(self.model_dir, exist_ok=True)
        save_path = self.model_dir / self.model_file_name
        self.model.save(save_path)
        return str(save_path) + ".zip"

    def load(self, id):
        model_file_name = f"model_{id}"
        model_dir = MODEL_DIR
        path = model_dir / f"model_training_{id}" / model_file_name
        if not path.with_suffix(".zip").exists():
            raise FileNotFoundError(f"No saved model found at {path}.zip")
        self.model = PPO.load(str(path) + ".zip", env=self.env)
        return self.model
