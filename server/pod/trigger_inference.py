import sys

import uvicorn

import server.pod.websocket.manager as manager
from server.pod.inference import inferencePod
from server.pod.websocket.manager import app
from server.utilities.callWebhook import call_webhook_for_inference

if __name__ == "__main__":
    uid = sys.argv[1]
    print(f"[1] Starting inference for uid: {uid}", flush=True)
    model = inferencePod(uid)
    print(f"[2] inferencePod returned: {model}", flush=True)
    if model is None:
        print("[ERROR] Model is None — inference failed silently", flush=True)
        sys.exit(1)

    manager.model = model
    print("Global Model has been uploaded: ", manager.model, flush=True)

    @app.on_event("startup")
    async def notify_client_ready():
        call_webhook_for_inference(uid)

    uvicorn.run(app, host="0.0.0.0", port=8001)
