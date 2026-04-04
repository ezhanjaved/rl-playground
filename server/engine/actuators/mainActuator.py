from engine.actuators.collectorActuator import collectorActuator
from engine.actuators.finderActuator import finderActuator
from engine.actuators.holderActuator import holderActuator
from engine.actuators.moveableActuator import moveableActuator
from utilities.capabilitiesMatch import capabilityMatcher


def process_action(agent_id, agent_data, action, entityMapping, entities):
    capabilityMatched = capabilityMatcher(action)
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
            targetReached = finderActuator(action, agent_data, entities)
            agent_data.state_space["targetReached"] = targetReached
        case "Holder":
            holderActuator(action, agent_data, entities, entityMapping)
        case "Collector":
            collectorActuator(action, agent_data, entities, entityMapping)
