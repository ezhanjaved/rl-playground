from server.database.select import fetchExtactModel
from server.database.update import update_model
from server.objectClass.sceneClass import make_runtime_state
from server.storage.downloadModel import download_from_s3
from server.training.training import TrainingLoop
from server.utilities.compile import compiler
from server.utilities.extractor import extact_graph_per_agent, extract_agent_list


def resume(uid: str, additional_steps: int):
    download_from_s3(uid)
    scenarioObject = compiler(uid)
    agent_list = extract_agent_list(scenarioObject)
    graphs_per_agent = extact_graph_per_agent(scenarioObject, agent_list)
    runTimeState = make_runtime_state(scenarioObject, agent_list, graphs_per_agent)

    record = fetchExtactModel(uid)
    already_trained = record.get("total_timestep", 0)
    target_timesteps = already_trained + additional_steps

    agent_id = runTimeState.agents_ids[0]
    runTimeState.assignment_by_agent[agent_id].config.timesteps = target_timesteps

    loop = TrainingLoop(scenarioObject, runTimeState, uid)
    loop.train()
    loop.save()

    update_model(
        id=uid,
        data={"total_timestep": target_timesteps},
        table="models",
        id_name="training_id",
    )
