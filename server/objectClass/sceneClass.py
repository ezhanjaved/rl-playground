from copy import deepcopy
from dataclasses import dataclass, field
from typing import Union

from server.database.select import fetchExtactModel
from server.objectClass.assignmentClass import Assignment
from server.objectClass.entitiesClass import Agent, Object
from server.objectClass.graphClass import Graph


# Blueprint
@dataclass
class Scenario:
    entities: dict[str, Agent | Object]
    graphs: dict[str, Graph]
    assignments: dict[str, Assignment]
    training_id: str


# Mutable Data
@dataclass
class TrainingState:
    entities: dict[str, Union[Agent, Object]]

    assignment_by_agent: dict[
        str, Assignment
    ]  # this contains agent_id (key) that holds agent config + their graph_id + config
    graph_per_agent: dict[str, Graph]

    agents_ids: list[str]

    env_type: str = "SARL"

    episode_count: int = 0
    step_count: int = 0

    truncated_agents: dict[str, bool] = field(default_factory=dict)
    terminated_agents: dict[str, bool] = field(default_factory=dict)

    rewards_agent: dict[str, float] = field(default_factory=dict)
    episode_reward: dict[str, float] = field(default_factory=dict)

    info: dict[str, dict] = field(default_factory=dict)

    highest_dist: float = 0.0
    spawn_mode: str = "Fixed"


def make_runtime_state(scenario, agents_ids, graphPerAgent, tId):
    record = fetchExtactModel(tId)
    highestDist: float = 0.0
    spawnMode: str = "Fixed"
    if record != None:
        highestDist = record.get("highest_dist", 0.0)
        spawnMode = record.get("spawn_mode", "Fixed")
    return TrainingState(
        entities=deepcopy(scenario.entities),
        assignment_by_agent=deepcopy(scenario.assignments),
        graph_per_agent=graphPerAgent,
        agents_ids=agents_ids,
        highest_dist=highestDist,
        spawn_mode=spawnMode,
    )
