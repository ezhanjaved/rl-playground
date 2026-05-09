from server.engine.actuators.collectorActuator import collectorActuator
from server.engine.actuators.depositActuator import depositActuator
from server.engine.actuators.finderActuator import finderActuator
from server.engine.actuators.holderActuator import holderActuator
from server.engine.actuators.moveableActuator import moveableActuator
from server.utilities.capabilitiesMatch import capabilityMatcher


def process_action(agent_id, agent_data, action, entityMapping, client, entities):
    capabilityMatched = capabilityMatcher(action)
    agentCapability = agent_data.capabilities
    actionSpace = agent_data.action_space  # array
    indexOfAction = actionSpace.index(action)
    match capabilityMatched:
        case "Moveable":
            moveableActuator(
                action,
                agent_data.position,
                agent_data.rotation,
                agent_data.settings["speed"],
                agent_id,
                entityMapping,
                client,
            )
        case "Finder":
            if "Finder" in agentCapability:
                finderActuator(action, agent_data, entities, indexOfAction)
        case "Holder":
            if "Holder" in agentCapability:
                holderActuator(
                    action, agent_data, entities, entityMapping, client, indexOfAction
                )
        case "Collector":
            if "Collector" in agentCapability:
                collectorActuator(
                    action, agent_data, entities, entityMapping, client, indexOfAction
                )
        case "Depositor":
            if "Depositor" in agentCapability:
                depositActuator(action, agent_data, entities, indexOfAction)
