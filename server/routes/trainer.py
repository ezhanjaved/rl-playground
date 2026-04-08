import traceback
import uuid
from typing import Any, Dict

from celery_app.rl_trainer import rl_trainer_celery
from database.insert import create_model
from fastapi import APIRouter
from pydantic import BaseModel
from storage.uploadModel import uploadConfig
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
        path = json_handler(model_id, data.dict())  # saves the data into machine
        config_path = uploadConfig(path)  # upload data from machine to s3 bucket
        create_model({"training_id": model_id, "config_path": config_path})
        rl_trainer_celery.delay(model_id)  # call celery with uid
        return {"message": "server has the data", "status": 1, "id": model_id}
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": exceptionMsg, "status": 0}
