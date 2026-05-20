from server.database.select import fetchExtactModel
from server.database.update import update_model, update_status
from server.objectClass.sceneClass import make_runtime_state
from server.storage.downloadModel import download_from_s3
from server.storage.uploadModel import uploadModel
from server.training.training import TrainingLoop
from server.utilities.callWebhook import call_webhook_for_training
from server.utilities.compile import compiler
from server.utilities.extractor import extact_graph_per_agent, extract_agent_list


def resume(uid: str, additional_steps: int):
    download_from_s3(uid)
    scenarioObject = compiler(uid)
    agent_list = extract_agent_list(scenarioObject)
    graphs_per_agent = extact_graph_per_agent(scenarioObject, agent_list)
    runTimeState = make_runtime_state(scenarioObject, agent_list, graphs_per_agent, uid)

    record = fetchExtactModel(uid)
    already_trained: int = record.get("total_timestep", 0)
    print("Already Trained Timesteps = ", already_trained)
    target_timesteps = already_trained + additional_steps
    print("Target Timesteps = ", target_timesteps)
    agent_id = runTimeState.agents_ids[0]
    runTimeState.assignment_by_agent[agent_id].config.timesteps = target_timesteps

    loop = TrainingLoop(scenarioObject, runTimeState, uid)
    loop.train()
    localPath = loop.save()
    s3Path = uploadModel(localPath, uid)
    update_status(uid, "model is saved", "models", "training_id")
    call_webhook_for_training(uid, s3Path)
    update_model(
        id=uid,
        data={"total_timestep": target_timesteps},
        table="models",
        id_name="training_id",
    )
    update_status(uid, "completed", "models", "training_id")
