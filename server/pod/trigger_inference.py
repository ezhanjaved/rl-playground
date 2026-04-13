import sys

import uvicorn

import server.pod.websocket.manager as manager
from server.pod.inference import inferencePod
from server.pod.websocket.manager import app

if __name__ == "__main__":
    uid = sys.argv[1]
    model = inferencePod(uid)

    manager.model = model
    print("Global Model has been uploaded: ", manager.model)

    uvicorn.run(app, host="0.0.0.0", port=8002)
