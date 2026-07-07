import copy
import os

from sb3_contrib import MaskablePPO
from stable_baselines3.common.callbacks import CallbackList, CheckpointCallback
from stable_baselines3.common.monitor import Monitor
from stable_baselines3.common.utils import FloatSchedule
from stable_baselines3.common.vec_env import SubprocVecEnv, VecNormalize

from server.database.select import fetchExtactModel
from server.path_config import MODEL_DIR
from server.storage.uploadModel import downloadLatestCheckpoint
from server.training.trainer.rewardCallback import RewardLoggerCallback

N_ENVS = 8


def make_env(scenario, runtime):

    def _init():
        from server.training.simulationBase import SimulationEnv
        from server.training.wrappers.gymWrapper import GymWrapper

        runtime_copy = copy.deepcopy(runtime)
        env = GymWrapper(
            SimulationEnv(scenario, runtime_copy),
            runtime_copy,
        )
        return Monitor(env, info_keywords=("shaping_cum", "terminal_cum"))

    return _init


class SingleAgentTrainer:
    def __init__(self, training_id, env, assignment, scenario=None, runtime=None):
        record = fetchExtactModel(training_id)
        self.already_trained = record.get("total_timestep", 0)

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

    def _apply_config_to_loaded_model(self):
        lr = float(self.learning_rate)
        clip_range = float(self.clip_range)
        gamma = float(self.gamma)
        gae_lambda = float(self.gae_lambda)

        self.model.learning_rate = lr
        self.model.lr_schedule = FloatSchedule(lr)
        self.model.clip_range = FloatSchedule(clip_range)

        self.model.ent_coef = float(self.ent_coeff)
        self.model.vf_coef = float(self.vf_coef)
        self.model.target_kl = None if self.target_kl is None else float(self.target_kl)
        self.model.n_epochs = int(self.epoch)
        self.model.batch_size = int(self.batch)

        buffer_changed = (
            gamma != self.model.gamma
            or gae_lambda != self.model.gae_lambda
            or self.n_steps != self.model.n_steps
        )

        self.model.gamma = gamma
        self.model.gae_lambda = gae_lambda

        if buffer_changed:
            buffer_cls = type(
                self.model.rollout_buffer
            )  # keeps Maskable(Dict)RolloutBuffer correct
            self.model.n_steps = self.n_steps
            self.model.rollout_buffer = buffer_cls(
                self.n_steps,
                self.model.observation_space,
                self.model.action_space,
                device=self.model.device,
                gamma=gamma,
                gae_lambda=gae_lambda,
                n_envs=self.model.n_envs,
            )

        for param_group in self.model.policy.optimizer.param_groups:
            param_group["lr"] = lr

        print(
            f"Config applied — lr: {lr}, clip_range: {clip_range}, "
            f"ent_coef: {self.model.ent_coef}, gamma: {gamma}, "
            f"gae_lambda: {gae_lambda}, n_steps: {self.model.n_steps}, "
            f"batch_size: {self.model.batch_size}"
        )

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

        raw_vec_env = SubprocVecEnv(
            [make_env(self.scenario, self.runtime) for _ in range(N_ENVS)],
            start_method="spawn",
        )

        checkpoint_dir = (
            MODEL_DIR / f"model_training_{self.training_id}" / "checkpoints"
        )
        os.makedirs(checkpoint_dir, exist_ok=True)

        resumed_timesteps = 0
        checkpoint_path = downloadLatestCheckpoint(self.training_id, checkpoint_dir)
        final_path = (
            MODEL_DIR
            / f"model_training_{self.training_id}"
            / f"model_{self.training_id}.zip"
        )
        if final_path.exists():
            print("Final model exists — resuming from final.")
            vecnorm_path = str(final_path).replace(".zip", "_vecnormalize.pkl")
            if os.path.exists(vecnorm_path):
                vec_env = VecNormalize.load(vecnorm_path, raw_vec_env)
                print(f"VecNormalize stats restored from {vecnorm_path}")
            else:
                print(
                    "No VecNormalize stats found for final model, starting normalizer fresh."
                )
                vec_env = VecNormalize(
                    raw_vec_env,
                    norm_obs=False,
                    norm_reward=True,
                    clip_reward=100.0,
                    gamma=self.gamma,
                )

            self.model = MaskablePPO.load(str(final_path), env=vec_env)
            self._apply_config_to_loaded_model()
            resumed_timesteps = self.already_trained
        else:
            if checkpoint_path is not None:
                print(f"Resuming from checkpoint: {checkpoint_path}")
                vecnorm_path = str(checkpoint_path).replace(".zip", "_vecnormalize.pkl")
                if os.path.exists(vecnorm_path):
                    vec_env = VecNormalize.load(vecnorm_path, raw_vec_env)
                    print(f"VecNormalize stats restored from {vecnorm_path}")
                else:
                    print("No VecNormalize stats found, starting normalizer fresh.")
                    vec_env = VecNormalize(
                        raw_vec_env,
                        norm_obs=False,
                        norm_reward=True,
                        clip_reward=100.0,
                        gamma=self.gamma,
                    )

                self.model = MaskablePPO.load(str(checkpoint_path), env=vec_env)
                self._apply_config_to_loaded_model()
                try:
                    stem = checkpoint_path.stem
                    resumed_timesteps = int(stem.split("_steps")[0].split("_")[-1])
                    print(f"Resuming at timestep {resumed_timesteps}")
                except Exception:
                    resumed_timesteps = self.already_trained
            else:
                print("No checkpoint or final model found, starting fresh.")
                vec_env = VecNormalize(
                    raw_vec_env,
                    norm_obs=False,
                    norm_reward=True,
                    clip_reward=100.0,
                    gamma=self.gamma,
                )
                self.model = MaskablePPO(
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
            save_vecnormalize=True,
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
            use_masking=True,  # add this
        )
        vec_env.close()

    def save(self, id):
        self.model_file_name = f"model_{id}"
        self.model_dir = MODEL_DIR / f"model_training_{id}"
        os.makedirs(self.model_dir, exist_ok=True)
        save_path = self.model_dir / self.model_file_name
        self.model.save(save_path)
        vecnorm_path = str(save_path) + "_vecnormalize.pkl"
        if hasattr(self.model, "get_vec_normalize_env"):
            venv = self.model.get_vec_normalize_env()
            if venv is not None:
                venv.save(vecnorm_path)

        return str(save_path)

    def load(self, id):
        model_file_name = f"model_{id}"
        model_dir = MODEL_DIR
        path = model_dir / f"model_training_{id}" / model_file_name
        if not path.with_suffix(".zip").exists():
            raise FileNotFoundError(f"No saved model found at {path}.zip")
        self.model = MaskablePPO.load(str(path) + ".zip", env=self.env)
        return self.model
