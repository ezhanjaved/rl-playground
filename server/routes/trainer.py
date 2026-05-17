import traceback
import uuid
from typing import Any, Dict

from fastapi import APIRouter
from pydantic import BaseModel

from server.celery_app.rl_inference import rl_inference
from server.celery_app.rl_resume import rl_resume
from server.celery_app.rl_test import rl_test
from server.celery_app.rl_trainer import rl_trainer
from server.database.insert import create_model
from server.database.select import fetchModels
from server.pod.debugRunner import debugRunner
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
    modelName: str
    envType: str
    timesteps: int


class RunModel(BaseModel):
    user_uid: str
    model_uid: str


class ResumeModel(BaseModel):
    training_id: str
    additional_steps: int


trainer = APIRouter()


@trainer.get("/")
def trainerTest():
    rl_test.delay()
    return {"message": "Trainer is ready"}


@trainer.post("/export-data")
async def getData(data: RequestModel):
    try:
        model_id = str(uuid.uuid4())
        path = json_handler(model_id, data.dict())
        user_uid = data.dict()["user_uid"]
        timesteps = data.dict()["timesteps"]
        model_name = data.dict()["modelName"]
        config_path = uploadConfig(path)
        create_model(
            {
                "training_id": model_id,
                "config_path": config_path,
                "user_id": user_uid,
                "name": model_name,
                "algorithm": "PPO",
                "total_timestep": timesteps,
            },
            "models",
        )
        rl_trainer.delay(model_id)
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/resume-training")
async def resumeTraining(data: ResumeModel):
    try:
        model_id = data.dict()["training_id"]
        timesteps = data.dict()["additional_steps"]
        rl_resume.delay(model_id, timesteps)
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/export-data-debug")
async def getDataDebug(data: RequestModel):
    try:
        model_id = str(uuid.uuid4())
        path = json_handler(model_id, data.dict())
        config_path = uploadConfig(path)
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


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
            entities = fetchEnt(model_id)
            rl_inference.delay(model_id)
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
        # FIX: same as above
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/fetch_models")
async def fetch_models(data: RunModel):
    try:
        user_id = data.dict()["user_uid"]
        print("User ID: ", user_id)
        models = fetchModels(user_id, "models", "user_id")
        return {"message": "models for this user", "status": 1, "models": models}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        # FIX: same as above
        return {"message": str(exceptionMsg), "status": 0}
