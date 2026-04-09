import sys

import uvicorn

from server.pod.inference import inferencePod
from server.pod.websocket.manager import app
from server.pod.websocket.manager import model as global_model

if __name__ == "__main__":
    uid = sys.argv[1]
    model = inferencePod(uid)

    global_model = model
    print("Global Model has been uploaded: ", global_model)

    uvicorn.run(app, host="0.0.0.0", port=8001)
