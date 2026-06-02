import traceback
import uuid
from typing import Any, Dict

from fastapi import APIRouter
from pydantic import BaseModel

from server.celery_app.rl_inference import rl_inference
from server.celery_app.rl_resume import rl_resume
from server.celery_app.rl_test import rl_test
from server.celery_app.rl_trainer import rl_trainer
from server.celery_app.rl_training_stop import rl_trainer_stop
from server.database.delete import delete_entry
from server.database.insert import create_model
from server.database.select import fetchModels
from server.database.update import update_model
from server.pod.debugRunner import debugRunner
from server.pod.jwt_token.generateJWT import create_access_token
from server.storage.deleteModel import delete_model
from server.storage.uploadModel import uploadConfig
from server.utilities.fetchEnt import fetchEnt, fetchGraph
from server.utilities.loader import json_handler
from server.utilities.validateOwner import validateOwner


class RequestModel(BaseModel):
    entities: Dict[str, Any]
    graphs: Dict[str, Any]
    assignments: Dict[str, Any]
    user_uid: str
    modelName: str | None = None
    envType: str | None = None
    timesteps: int
    highestDistance: float
    spawnMode: str
    randomSpawnAfterEp: int | None = None


class RunModel(BaseModel):
    user_uid: str
    model_uid: str


class ConfigModel(RequestModel):
    graphChange: bool | None = None
    environChange: bool | None = None
    configChange: bool | None = None
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
        highestDistance = data.dict()["highestDistance"]
        spawnMode = data.dict()["spawnMode"]
        randomSpawnAfterEp = data.dict().get(
            "randomSpawnAfterEp"
        )  # None if not provided
        config_path = uploadConfig(path)
        create_model(
            {
                "training_id": model_id,
                "config_path": config_path,
                "user_id": user_uid,
                "name": model_name,
                "algorithm": "PPO",
                "total_timestep": timesteps,
                "highest_dist": highestDistance,
                "spawn_mode": spawnMode,
                "fixed_episode_per": randomSpawnAfterEp,
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
        user_uid = data.dict()["user_uid"]
        timesteps = data.dict()["timesteps"]
        model_name = data.dict()["modelName"]
        highestDistance = data.dict()["highestDistance"]
        spawnMode = data.dict()["spawnMode"]
        randomSpawnAfterEp = data.dict().get(
            "randomSpawnAfterEp"
        )  # None if not provided
        config_path = uploadConfig(path)
        create_model(
            {
                "training_id": model_id,
                "config_path": config_path,
                "user_id": user_uid,
                "name": model_name,
                "algorithm": "PPO",
                "total_timestep": timesteps,
                "highest_dist": highestDistance,
                "spawn_mode": spawnMode,
                "fixed_episode_per": randomSpawnAfterEp,
            },
            "models",
        )
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
            graphs = fetchGraph(model_id)
            rl_inference.delay(model_id)
            return {
                "message": "Ownership test passed",
                "status": 1,
                "user_id": user_id,
                "session_id": session_id,
                "jwt_token": token,
                "entities": entities,
                "graphs": graphs,
            }
        else:
            return {"message": "Ownership failed", "status": 0}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/kill-model")
async def kill_the_model(data: RunModel):
    try:
        dictObj = data.dict()
        model_id = dictObj["model_uid"]
        user_id = dictObj["user_uid"]
        status = validateOwner(model_id, user_id)
        if status:
            session_id = str(uuid.uuid4())
            token = create_access_token(dictObj)
            rl_trainer_stop.delay(model_id)
            return {
                "message": "Ownership test passed",
                "status": 1,
                "user_id": user_id,
                "session_id": session_id,
                "jwt_token": token,
            }
        else:
            return {"message": "Ownership failed", "status": 0}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
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
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/fetch_current_config")
async def fetch_current_config(data: RunModel):
    try:
        model_id = data.dict()["model_uid"]
        entities = fetchEnt(model_id)
        graphs = fetchGraph(model_id)
        return {
            "message": "configs for this model",
            "status": 1,
            "entities": entities,
            "graphs": graphs,
        }

    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/change-config")
async def change_config(data: ConfigModel):
    try:
        model_id = data.dict()["model_uid"]

        environChange = data.dict()["environChange"]
        graphChange = data.dict()["graphChange"]
        configChange = data.dict()["configChange"]

        def to_bool(val):
            if isinstance(val, bool):
                return val
            return str(val).lower() == "true"

        changePermission = [
            to_bool(environChange),
            to_bool(graphChange),
            to_bool(configChange),
        ]

        path = json_handler(model_id, data.dict(), changePermission)

        highestDistance = data.dict()["highestDistance"]
        spawnMode = data.dict()["spawnMode"]
        randomSpawnAfterEp = data.dict().get(
            "randomSpawnAfterEp"
        )  # None if not provided
        config_path = uploadConfig(path)  # upload config to bucket
        if highestDistance:
            payload = {
                "highest_dist": highestDistance,
                "config_path": config_path,
                "spawn_mode": spawnMode,
                "fixed_episode_per": randomSpawnAfterEp,
            }
        else:
            payload = {
                "config_path": config_path,
                "spawn_mode": spawnMode,
                "fixed_episode_per": randomSpawnAfterEp,
            }

        update_model(
            id=model_id,
            data=payload,
            table="models",
            id_name="training_id",
        )
        return {"message": "config for this model has been updated", "status": 1}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@trainer.post("/delete_model")
async def delete_models(data: RunModel):
    try:
        user_id = data.dict()["user_uid"]
        id = data.dict()["model_uid"]
        storageDelete = delete_model(id)
        if storageDelete:
            databaseDelete = delete_entry(id, "training_id", "models", user_id)
            if databaseDelete:
                return {"message": "model is deleted", "status": 1}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}
