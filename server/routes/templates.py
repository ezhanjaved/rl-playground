import traceback
from typing import Any, Dict

from fastapi import APIRouter
from pydantic import BaseModel

from server.database.insert import create_template
from server.database.select import checkTemplateExists, fetchTemplate
from server.storage.downloadModel import downloadTemplate
from server.storage.uploadModel import upload_template
from server.utilities.loader import json_template_loader, json_template_saver


class TemplateReq(BaseModel):
    user_id: str
    type: str


class ImportReq(TemplateReq):
    path: str


class ExportReq(TemplateReq):
    data: Dict[str, Any]
    name: str


class ViewReq(TemplateReq):
    pass


template = APIRouter()


@template.post("/export-template")
async def getData(data: ExportReq):
    try:
        user_uid = data.dict()["user_id"]
        name = data.dict()["name"]
        type = data.dict()["type"]
        data = data.dict()["data"]
        template_name = f"{name}-{type}-{user_uid}"
        status = checkTemplateExists(user_uid, type, template_name)
        if status:
            return {
                "message": "Template with this name exists, try again with different name.",
                "status": 0,
            }
        local_path = json_template_saver(data, template_name)
        template_path = upload_template(local_path, template_name)
        create_template(
            {
                "name": name,
                "type": type,
                "user_id": user_uid,
                "path": template_path,
            },
        )
        return {
            "message": "Your template has been uploaded.",
            "status": 1,
            "path": template_path,
        }
    except Exception as exceptionMsg:
        print("An Error Occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@template.post("/import-template")
async def run_the_model(data: ImportReq):
    try:
        dictObj = data.dict()
        user_id = dictObj["user_id"]
        path = dictObj["path"]
        type = dictObj["type"]
        local_path = downloadTemplate(path)
        data = json_template_loader(local_path)
        return {"message": "Template is send", "status": 1, "data": data}
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}


@template.post("/view-templates")
async def fetch_models(data: ViewReq):
    try:
        user_id = data.dict()["user_id"]
        type = data.dict()["type"]
        templates = fetchTemplate(user_id, type)
        return {
            "message": "templates for this user",
            "status": 1,
            "templates": templates,
        }
    except Exception as exceptionMsg:
        print("An error occured")
        traceback.print_exc()
        return {"message": str(exceptionMsg), "status": 0}
