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


@dataclass
class Assignment:
    graph_id: str
    config: AssignmentConfig
