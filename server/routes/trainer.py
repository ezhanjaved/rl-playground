import uuid
from typing import Any, Dict

from fastapi import APIRouter
from objectClass.sceneClass import make_runtime_state
from pydantic import BaseModel
from training.training import trainingPipeline
from utilities.compile import compiler
from utilities.extractor import extact_graph_per_agent, extract_agent_list
from utilities.loader import json_handler


class RequestModel(BaseModel):
    entities: Dict[str, Any]
    graphs: Dict[str, Any]
    assignments: Dict[str, Any]


trainer = APIRouter()


@trainer.get("/")
def trainerTest():
    return {"message": "Trainer is ready"}


@trainer.post("/export-data")
async def getData(data: RequestModel):
    try:
        model_id = str(uuid.uuid4())
        json_handler(model_id, data.dict())  # saves the data into machine
        scenarioObject = compiler(model_id)  # returns compiled scenario object
        agent_list = extract_agent_list(scenarioObject)  # extracts the agents_ids
        graphs_per_agent = extact_graph_per_agent(
            scenarioObject, agent_list
        )  # extract the graphs for agents by their id
        runTimeState = make_runtime_state(
            scenarioObject, agent_list, graphs_per_agent
        )  # form a runtime obj that will mutate while training
        trainingPipeline(scenarioObject, runTimeState)
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        return {"message": exceptionMsg, "status": 0}
