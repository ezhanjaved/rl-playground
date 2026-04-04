from copy import deepcopy
from dataclasses import dataclass, field
from typing import Union

from objectClass.assignmentClass import Assignment
from objectClass.entitiesClass import Agent, Object
from objectClass.graphClass import Graph


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

    episode_count: int = 0
    step_count: int = 0

    truncated_agents: dict[str, bool] = field(default_factory=dict)
    terminated_agents: dict[str, bool] = field(default_factory=dict)

    rewards_agent: dict[str, float] = field(default_factory=dict)
    episode_reward: dict[str, float] = field(default_factory=dict)

    info_by_agent: dict[str, dict] = field(default_factory=dict)


def make_runtime_state(scenario, agents_ids, graphPerAgent):
    return TrainingState(
        entities=deepcopy(scenario.entities),
        assignment_by_agent=deepcopy(scenario.assignments),
        graph_per_agent=graphPerAgent,
        agents_ids=agents_ids,
    )
