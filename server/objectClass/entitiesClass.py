from dataclasses import dataclass, field
from typing import TypedDict, cast


class StateSpace(TypedDict, total=False):
    targetReached: bool
    previous_distance_target: float

    holding: bool
    lastPickSuccess: bool
    previous_distance_pickable: float

    lastItemCollected: str
    items_collected: int
    previous_distance_collect: float


@dataclass(kw_only=True)
class Entities:
    id: str
    tag: str
    name: str
    position: list[float]
    rotation: list[float]
    quatRotation: list[float]

    isDecor: bool
    isPickable: bool
    isCollectable: bool
    isTarget: bool

    collider: dict = field(default_factory=dict)


@dataclass
class Agent(Entities):
    isAssigned: bool
    last_action: str
    capabilities: list[str]
    observation_space: list[str] = field(default_factory=list)
    action_space: list[str] = field(default_factory=list)
    state_space: StateSpace = field(default_factory=lambda: cast(StateSpace, {}))
    settings: dict = field(default_factory=dict)


@dataclass
class Object(Entities):
    pass
