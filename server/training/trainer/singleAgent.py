import os

from stable_baselines3 import PPO

from server.path_config import MODEL_DIR


class SingleAgentTrainer:
    def __init__(self, env):
        self.env = env
        self.model = None

    def train(self):
        if self.model is None:
            self.model = PPO("MlpPolicy", self.env, verbose=1)
        self.model.learn(total_timesteps=10000)

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
