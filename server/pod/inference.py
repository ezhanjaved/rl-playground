import traceback

from server.database.update import update_status
from server.pod.basis import basis
from server.storage.downloadModel import downloadModel
from server.utilities.callWebhook import call_webhook_for_inference


def inferencePod(uid):
    try:
        update_status(uid, "downloading model", "simulation", "model_id")
        runner = basis(uid)
        downloadModel(uid)
        model = runner.load()
        update_status(uid, "model is loaded", "simulation", "model_id")
        call_webhook_for_inference(uid)
        return model
    except Exception:
        print(f"Inference for model {uid}")
        tb = traceback.format_exc()
        print(tb)
        update_status(uid, "inference failed", "simulation", "model_id")
        raise
