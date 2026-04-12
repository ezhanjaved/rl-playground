import hashlib
import hmac
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from server.database.update import update_model, update_status
from server.routes.trainer import trainer
from server.websocket.broadcast import manager

origins = ["*"]
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trainer, prefix="/trainer")


@app.get("/")
def read_root():
    return {"message": "Hello World"}


SECRET = str(os.getenv("WEB_SECRET"))


@app.post("/webhook/training-finished")
async def webhookTrained(request: Request):
    body = await request.body()
    signature = request.headers.get("x-signature")

    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")

    expected = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=401, detail="Invalid signature")

    payload = await request.json()

    print("Webhook verified:", payload)

    uid = payload["model_id"]
    path = payload["path"]
    # DB update
    update_model(
        uid, {"status": "completed", "model_path": path}, "models", "training_id"
    )
    # Email Send
    print(f"Sending Email to User for Model Trained: {uid}")
    return {"status": "success"}


@app.post("/webhook/model-ready")
async def webhookReady(request: Request):
    body = await request.body()
    signature = request.headers.get("x-signature")

    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")

    expected = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=401, detail="Invalid signature")

    payload = await request.json()

    print("Webhook verified:", payload)

    uid = payload["model_id"]
    url = payload["url"]

    update_status(uid, {"status": "ready"}, "simulation", "model_id")

    await manager.broadcast({"type": "MODEL_READY", "model_id": uid, "pod_url": url})

    return {"status": "ok"}
