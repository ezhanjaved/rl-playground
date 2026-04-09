from server.training.trainer.singleAgent import SingleAgentTrainer
from server.training.wrappers.mainWrapper import wrapperSelector


class TrainingLoop:
    def __init__(
        self, sc, runtime, trainingId
    ):  # trainingId is UID send to client side
        self.ws = wrapperSelector(sc, runtime)
        self.env = self.ws.get_env()
        self.type = runtime.env_type
        self.training_id = trainingId
        if self.type == "SARL":
            self.trainer = SingleAgentTrainer(self.env)
        else:
            pass

    def train(self):
        self.trainer.train()

    def pause_and_run(self):
        pass

    def save(self):
        path = self.trainer.save(self.training_id)
        return path

    def load(self):
        self.model = self.trainer.load(self.training_id)
        return self.model
