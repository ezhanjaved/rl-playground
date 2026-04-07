from database.update import update_status
from objectClass.sceneClass import make_runtime_state
from storage.downloadModel import download_from_s3
from storage.uploadModel import uploadModel
from training.training import TrainingLoop
from utilities.callWebhook import call_webhook
from utilities.compile import compiler
from utilities.extractor import extact_graph_per_agent, extract_agent_list


def runpod_job(uid: str):
    # call runpod
    update_status(uid, "training")
    download_from_s3(uid)
    scenarioObject = compiler(uid)  # returns compiled scenario object
    agent_list = extract_agent_list(scenarioObject)  # extracts the agents_ids
    graphs_per_agent = extact_graph_per_agent(
        scenarioObject, agent_list
    )  # extract the graphs for agents by their id
    runTimeState = make_runtime_state(
        scenarioObject, agent_list, graphs_per_agent
    )  # form a runtime obj that will mutate while training
    trainer = TrainingLoop(scenarioObject, runTimeState, uid)
    trainer.train()
    local_path = trainer.save()
    s3Path = uploadModel(uid, local_path)
    update_status(uid, "saved")
    call_webhook(uid, s3Path)
