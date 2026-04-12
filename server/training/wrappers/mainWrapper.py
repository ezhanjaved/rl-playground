from wrappers.gymWrapper import GymWrapper
from wrappers.pettingZooWrapper import PettingZooWrapper

from server.training.simulationBase import SimulationEnv


class wrapperSelector:
    def __init__(self, sceanrio, runTime):
        self.type = runTime.env_type
        self.engine = SimulationEnv(sceanrio, runTime)
        if self.type == "SARL":
            self.wrapper = GymWrapper(self.engine)
        else:
            self.wrapper = PettingZooWrapper(self.engine)

    def get_env(self):
        return self.wrapper
