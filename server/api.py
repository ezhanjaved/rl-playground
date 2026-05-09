import hashlib
import hmac
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
from server.database.update import update_model, update_status
from server.routes.analysis import analysis
from server.routes.graph_ai import graph_ai
from server.routes.trainer import trainer
from server.websocket.broadcast import ConnectionManager

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trainer, prefix="/trainer")
app.include_router(analysis, prefix="/api/analysis")
app.include_router(graph_ai, prefix="/api/graph-ai")


@app.get("/")
def read_root():
    return {"message": "Hello World"}


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except Exception as e:
        print("WebSocket error:", e)
        manager.disconnect(websocket)


SECRET = str(os.getenv("WEB_SECRET"))


@app.post("/webhook/training-finished")
async def webhookTrained(request: Request):
    body = await request.body()
    signature = request.headers.get("x-signature")

    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")

    if not SECRET:
        raise HTTPException(
            status_code=500, detail="Server misconfigured: missing SECRET"
        )

    expected = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=401, detail="Invalid signature")

    data = await request.json()

    print("Webhook verified:", data)

    uid = data.get("model_id")
    path = data.get("path")

    if not uid or not path:
        raise HTTPException(status_code=400, detail="Invalid payload")

    update_model(
        uid,
        {"status": "finished", "model_path": path},
        "models",
        "training_id",
    )
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

    update_status(uid, "ready", "simulation", "model_id")

    await manager.broadcast({"status": "READY", "model_id": uid, "pod_url": url})

    return {"status": "ok"}
