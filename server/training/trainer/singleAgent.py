import os
from typing import Callable, Union, cast

from stable_baselines3 import PPO

from server.path_config import MODEL_DIR


class SingleAgentTrainer:
    def __init__(self, env, assignment):
        self.env = env
        self.model = None
        self.assignment = assignment.config

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
        mode_entropy_coef = self.assignment.explorationStrategy

        if self.learning_rate == "Slow":
            self.learning_rate = 1e-4
        elif self.learning_rate == "Medium":
            self.learning_rate = 3e-4
        elif self.learning_rate == "Fast":
            self.learning_rate = 1e-3

        if mode_entropy_coef == "Fixed":
            self.entropy_coef = 0.01
        elif mode_entropy_coef == "Decay":
            self.entropy_coef = lambda p: 0.02 * p
        elif mode_entropy_coef == "None":
            self.entropy_coef = 0.0

    def train(self):
        self.batch = min(self.batch, self.n_steps)
        self.n_steps = max(512, self.n_steps)
        self.clip_range = max(0.1, min(self.clip_range, 0.3))
        self.gae_lambda = max(0.9, min(self.gae_lambda, 0.98))
        self.entropy_coef = cast(
            Union[float, Callable[[float], float]], self.entropy_coef
        )

        if self.model is None:
            self.model = PPO(
                "MlpPolicy",
                self.env,
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
        self.model.learn(total_timesteps=self.timesteps)

    def save(
        self, id
    ):  # use the uid to create file_name and upload the model to S3 bucket
        self.model_file_name = f"model_{id}"

        self.mode_dir = MODEL_DIR
        os.makedirs(self.mode_dir, exist_ok=True)

        save_path = self.mode_dir / self.model_file_name
        self.model.save(save_path)

        final_path = str(save_path) + ".zip"

        return final_path

    def load(
        self, id
    ):  # use the uid to fetch from S3 bucket the model using file_name and run it
        model_file_name = f"model_{id}"

        mode_dir = MODEL_DIR
        path = mode_dir / model_file_name

        if not path.with_suffix(".zip").exists():
            raise FileNotFoundError

        final_path = str(path) + ".zip"
        self.model = PPO.load(final_path, env=self.env)
        return self.model
