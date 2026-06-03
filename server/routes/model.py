import os
import tempfile

from fastapi import APIRouter, File, HTTPException, Query, UploadFile
from fastapi.responses import JSONResponse

from server.database.supabaseClient import (
    supabase,  # however you access your supabase client
)
from server.storage.r2Client import s3

modelRouter = APIRouter()

BUCKET = "rl-models"
PRESIGN_EXPIRY = 3600


@modelRouter.get("/download-links")
def get_download_links(uid: str = Query(...)):
    keys = {
        "models": f"model_training_{uid}/model_{uid}.zip",
        "norms": f"model_training_{uid}/model_{uid}_vecnormalize.pkl",
    }
    urls = {}
    for label, key in keys.items():
        try:
            urls[label] = s3.generate_presigned_url(
                "get_object",
                Params={"Bucket": BUCKET, "Key": key},
                ExpiresIn=PRESIGN_EXPIRY,
            )
        except Exception:
            urls[label] = None
    print("URLS: ", urls)
    return urls


@modelRouter.post("/upload-checkpoint")
async def upload_checkpoint(
    uid: str = Query(...),
    file_type: str = Query(...),  # "model" or "norm"
    resumed_timesteps: int = Query(...),  # user-supplied figure e.g. 1500000
    file: UploadFile = File(...),
):
    if file_type not in ("model", "norm"):
        raise HTTPException(400, "file_type must be 'model' or 'norm'")

    ext = ".zip" if file_type == "model" else "_vecnormalize.pkl"
    key = f"model_training_{uid}/model_{uid}{ext}"

    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        s3.upload_file(tmp_path, BUCKET, key)
    finally:
        os.unlink(tmp_path)

    # Only update DB when the model zip is uploaded (not the pkl)
    # to avoid double-writing and so timestep is set once both files are ready
    if file_type == "model":
        supabase.table("models").update(
            {
                "current_timestep": resumed_timesteps,
                "total_timestep": resumed_timesteps,
            }
        ).eq("training_id", uid).execute()

    return {"ok": True, "key": key}
