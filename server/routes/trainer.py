import traceback
import uuid
from typing import Any, Dict

from fastapi import APIRouter
from pydantic import BaseModel

from server.celery_app.rl_inference import rl_inference_celery
from server.celery_app.rl_test import rl_test
from server.celery_app.rl_trainer import rl_trainer_celery
from server.database.insert import create_model
from server.database.select import fetchModels
from server.pod.jwt_token.generateJWT import create_access_token
from server.storage.uploadModel import uploadConfig
from server.utilities.fetchEnt import fetchEnt
from server.utilities.loader import json_handler
from server.utilities.validateOwner import validateOwner


class RequestModel(BaseModel):
    entities: Dict[str, Any]
    graphs: Dict[str, Any]
    assignments: Dict[str, Any]
    user_uid: str


class RunModel(BaseModel):
    user_uid: str
    model_uid: str


trainer = APIRouter()


@trainer.get("/")
def trainerTest():
    rl_test.delay()
    return {"message": "Trainer is ready"}


@trainer.post("/export-data")
async def getData(data: RequestModel):
    try:
        model_id = str(uuid.uuid4())
        path = json_handler(model_id, data.dict())  # saves the data into machine
        user_uid = data.dict()["user_uid"]
        config_path = uploadConfig(path)  # upload data from machine to s3 bucket
        create_model(
            {"training_id": model_id, "config_path": config_path, "user_id": user_uid},
            "models",
        )
        rl_trainer_celery.delay(model_id)  # call celery with uid
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": exceptionMsg, "status": 0}


@trainer.post("/run-model")
async def run_the_model(data: RunModel):
    try:
        dictObj = data.dict()
        model_id = dictObj["model_uid"]
        user_id = dictObj["user_uid"]
        status = validateOwner(model_id, user_id)
        if status:
            session_id = str(uuid.uuid4())
            token = create_access_token(dictObj)
            create_model(
                {"session_id": session_id, "user_id": user_id, "model_id": model_id},
                "simulation",
            )
            # a function that uses model_id and feteches entities.json and return it with response.
            entities = fetchEnt(model_id)
            # call celery
            rl_inference_celery.delay(model_id)
            return {
                "message": "Ownership test passed",
                "status": 1,
                "user_id": user_id,
                "session_id": session_id,
                "jwt_token": token,
                "entities": entities,
            }
        else:
            return {"message": "Ownership failed", "status": 0}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": exceptionMsg, "status": 0}


@trainer.post("/fetch_models")
async def fetch_models(data: RunModel):
    try:
        user_id = data.dict()["user_uid"]
        models = fetchModels(user_id, "models", "user_id")
        return {"message": "models for this user", "status": 1, "models": models}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": exceptionMsg, "status": 0}
