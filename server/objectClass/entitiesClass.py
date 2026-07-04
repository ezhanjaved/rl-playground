from dataclasses import dataclass, field
from typing import TypedDict, cast


class StateSpace(TypedDict, total=False):
    last_action_index: float
    last_action_counter: float

    targetReached: bool
    previous_distance_target: float

    holding: bool
    lastPickSuccess: bool
    previous_distance_pickable: float

    lastItemCollected: str
    items_collected: int
    keys_collected: int
    total_items_collected: int
    previous_distance_collect: float

    items_deposited: float
    nearDeposit: bool
    lastDepositSuccess: bool
    previous_distance_deposit: float

    items_destroyed: int
    nearDestroyable: bool
    lastDestroySuccess: bool
    previous_distance_destroyable: float

    gates_open: int
    nearGate: bool
    lastOpenSuccess: bool
    previous_distance_gate: float

    team_goals_scored: int
    team_goals_conceded: int
    my_goals_scored: int
    my_own_goals_scored: int
    last_goal_type: float
    lastKickSuccess: bool
    previous_distance_ball: float
    previous_distance_goal: float


@dataclass(kw_only=True)
class Entities:
    id: str
    tag: str
    name: str
    position: list[float]
    rotation: list[float]
    quatRotation: list[float]

    goalId: str
    teamId: str
    positionSpawned: list[float]

    isBall: bool
    isGoalPostRed: bool
    isGoalPostBlue: bool
    isDecor: bool
    isPickable: bool
    isCollectable: bool
    isTarget: bool
    isDeposit: bool
    isGate: bool
    isDestroyable: bool

    collider: dict = field(default_factory=dict)


@dataclass
class Agent(Entities):
    isAssigned: bool
    last_action: str
    capabilities: list[str]
    current_behavior: str
    observation_space: list[str] = field(default_factory=list)
    behavior: list[dict] = field(default_factory=list)
    behaviorObs: list[str] = field(default_factory=list)
    action_space: list[str] = field(default_factory=list)
    state_space: StateSpace = field(default_factory=lambda: cast(StateSpace, {}))
    settings: dict = field(default_factory=dict)


@dataclass
class Object(Entities):
    state: dict = field(default_factory=dict)
