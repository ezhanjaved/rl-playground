import sys

import uvicorn

import server.pod.websocket.manager as manager
from server.pod.inference import inferencePod
from server.pod.websocket.manager import app

if __name__ == "__main__":
    uid = sys.argv[1]
    print(f"[1] Starting inference for uid: {uid}")
    model = inferencePod(uid)
    print(f"[2] inferencePod returned: {model}")  # is this None?

    if model is None:
        print("[ERROR] Model is None — inference failed silently")
        sys.exit(1)

    manager.model = model
    print("Global Model has been uploaded: ", manager.model)
    uvicorn.run(app, host="0.0.0.0", port=8001)
