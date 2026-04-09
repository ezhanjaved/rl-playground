from server.objectClass.sceneClass import make_runtime_state
from server.storage.downloadModel import download_from_s3
from server.training.training import TrainingLoop
from server.utilities.compile import compiler
from server.utilities.extractor import extact_graph_per_agent, extract_agent_list


def basis(uid):
    download_from_s3(uid)
    scenarioObject = compiler(uid)  # returns compiled scenario object
    agent_list = extract_agent_list(scenarioObject)  # extracts the agents_ids
    graphs_per_agent = extact_graph_per_agent(
        scenarioObject, agent_list
    )  # extract the graphs for agents by their id
    runTimeState = make_runtime_state(
        scenarioObject, agent_list, graphs_per_agent
    )  # form a runtime obj that will mutate while training
    instaneOfTL = TrainingLoop(scenarioObject, runTimeState, uid)
    return instaneOfTL
