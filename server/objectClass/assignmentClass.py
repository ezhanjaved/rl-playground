from dataclasses import dataclass


@dataclass
class AssignmentConfig:
    episodeNumber: int
    maxStepsPerEpisode: int
    rewardImp: float
    algorithm: str
    explorationStrategy: str
    learningSpeed: str
    rewardMultiplier: int
    agentSpawnMode: str
    objectSpawnMode: str
    clipRange: float
    gaeLambda: float
    valLossCf: float
    batch: int
    epoch: int
    n_steps: int


@dataclass
class Assignment:
    graph_id: str
    config: AssignmentConfig
