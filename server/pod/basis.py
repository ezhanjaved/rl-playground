from server.objectClass.sceneClass import make_runtime_state
from server.storage.downloadModel import download_from_s3
from server.training.debug_training import debugPipeline
from server.training.training import TrainingLoop
from server.utilities.compile import compiler
from server.utilities.extractor import extact_graph_per_agent, extract_agent_list

mode = "debug"


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
    if mode == "debug":
        print("Entering Debuging Mode")
        debugPipeline(scenarioObject, runTimeState, uid)
        return
    else:
        instanceTl = basis_second(scenarioObject, runTimeState, uid)
        return instanceTl


def basis_second(scenarioObject, runTimeState, uid):
    instaneOfTL = TrainingLoop(scenarioObject, runTimeState, uid)
    return instaneOfTL
