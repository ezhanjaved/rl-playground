from server.training.trainer.singleAgent import SingleAgentTrainer


class TrainingLoop:
    def __init__(self, sc, runtime, trainingId):
        self.type = runtime.env_type

        self.assignments = runtime.assignment_by_agent
        self.agentsIds = runtime.agents_ids

        self.pickedAgent = self.agentsIds[0]
        self.pickedAssignment = self.assignments[self.pickedAgent]

        self.training_id = trainingId

        if self.type == "SARL":
            self.trainer = SingleAgentTrainer(
                self.training_id,
                env=None,
                assignment=self.pickedAssignment,
                scenario=sc,
                runtime=runtime,
            )
        else:
            raise NotImplementedError(
                f"Training loop for env_type '{self.type}' is not yet implemented."
            )

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
