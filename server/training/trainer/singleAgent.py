import copy
import os

from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import SubprocVecEnv

from server.path_config import MODEL_DIR
from server.training.trainer.rewardCallback import RewardLoggerCallback

N_ENVS = 4  # number of parallel physics envs — tune based on your scenario


def make_env(scenario, runtime):

    runtime_copy = copy.deepcopy(runtime)

    def _init():
        from server.training.simulationBase import SimulationEnv
        from server.training.wrappers.gymWrapper import GymWrapper

        return GymWrapper(SimulationEnv(scenario, runtime_copy), runtime_copy)

    return _init


class SingleAgentTrainer:
    def __init__(self, training_id, env, assignment, scenario=None, runtime=None):
        self.env = env  # single env — kept for load() compatibility
        self.scenario = scenario  # needed to build SubprocVecEnv
        self.runtime = runtime  # needed to build SubprocVecEnv
        self.model = None
        self.assignment = assignment.config
        self.training_id = training_id

        self.timesteps = (
            self.assignment.episodeNumber * self.assignment.maxStepsPerEpisode
        )
        self.gamma = self.assignment.rewardImp
        self.learning_rate = self.assignment.learningSpeed
        self.clip_range = self.assignment.clipRange
        self.gae_lambda = self.assignment.gaeLambda
        self.vf_coef = self.assignment.valLossCf
        self.batch = self.assignment.batch
        self.epoch = self.assignment.epoch
        self.n_steps = self.assignment.n_steps

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
            # round down to nearest divisor
            self.batch = max(
                b for b in range(1, self.batch + 1) if effective_buffer % b == 0
            )

        # Build N_ENVS parallel environments
        vec_env = SubprocVecEnv(
            [make_env(self.scenario, self.runtime) for _ in range(N_ENVS)],
            start_method="fork",  # faster on Linux; use "spawn" if you hit issues
        )

        if self.model is None:
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
                ent_coef=0.01,
                verbose=1,
                target_kl=0.03,
            )

        callback = RewardLoggerCallback(training_id=self.training_id, log_every_n=1)
        self.model.learn(total_timesteps=self.timesteps, callback=callback)
        vec_env.close()  # clean up all subprocess connections after training

    def save(self, id):
        self.model_file_name = f"model_{id}"
        self.mode_dir = MODEL_DIR
        os.makedirs(self.mode_dir, exist_ok=True)
        save_path = self.mode_dir / self.model_file_name
        self.model.save(save_path)
        return str(save_path) + ".zip"

    def load(self, id):
        model_file_name = f"model_{id}"
        mode_dir = MODEL_DIR
        path = mode_dir / f"model_training_{id}" / model_file_name
        if not path.with_suffix(".zip").exists():
            raise FileNotFoundError
        self.model = PPO.load(str(path) + ".zip", env=self.env)
        return self.model
