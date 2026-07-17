import sys

import uvicorn

import server.pod.websocket.manager as manager
from server.pod.inference import inferencePod
from server.pod.websocket.manager import app
from server.utilities.callWebhook import call_webhook_for_inference
from server.database.select import fetchModelsIdForInference

def get_models_id(session_id):
    if session_id is None:
        return

    models_list_dict = fetchModelsIdForInference(session_id)
    models_list = list(models_list_dict[0]["model_lists"].values())
    return models_list


if __name__ == "__main__":
    session_uid = sys.argv[1]
    uids = get_models_id(session_uid) # ["model_1", "model_2"]
    models = {}
    print(f"[1] Starting inference for uid: {session_uid}", flush=True)
    for id in uids:
        model = inferencePod(id)
        models[id] = model
    print(f"[2] inferencePod returned: {models}", flush=True)
    if models is None:
        print("[ERROR] Model is None — inference failed silently", flush=True)
        sys.exit(1)

    manager.models = models
    manager.session_id = session_uid
    print("Global Model has been uploaded: ", manager.models, flush=True)

    @app.on_event("startup")
    async def notify_client_ready():
        call_webhook_for_inference(session_uid)

    uvicorn.run(app, host="0.0.0.0", port=8001)
