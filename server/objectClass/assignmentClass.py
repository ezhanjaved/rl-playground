from dataclasses import dataclass


@dataclass
class AssignmentConfig:
    rewardImp: float
    algorithm: str
    learningSpeed: str
    rewardMultiplier: int
    timesteps: int
    clipRange: float
    gaeLambda: float
    valLossCf: float
    batch: int
    epoch: int
    n_steps: int
    target_kl: float
    ent_coeff: float


@dataclass
class Assignment:
    graph_id: str
    config: AssignmentConfig
