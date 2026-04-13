from server.engine.actuators.collectorActuator import collectorActuator
from server.engine.actuators.finderActuator import finderActuator
from server.engine.actuators.holderActuator import holderActuator
from server.engine.actuators.moveableActuator import moveableActuator
from server.utilities.capabilitiesMatch import capabilityMatcher


def process_action(agent_id, agent_data, action, entityMapping, entities):
    capabilityMatched = capabilityMatcher(
        action
    )  # Capability of ACTION produced by system
    agentCapability = agent_data.capabilities  # Actual Capability of the Agent
    match capabilityMatched:
        case "Moveable":
            moveableActuator(
                action,
                agent_data.position,
                agent_data.rotation,
                agent_data.settings["speed"],
                agent_id,
                entityMapping,
            )
        case "Finder":
            if "Finder" in agentCapability:
                targetReached = finderActuator(action, agent_data, entities)
                agent_data.state_space["targetReached"] = targetReached
        case "Holder":
            if "Holder" in agentCapability:
                holderActuator(action, agent_data, entities, entityMapping)
        case "Collector":
            if "Collector" in agentCapability:
                collectorActuator(action, agent_data, entities, entityMapping)
