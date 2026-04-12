from server.database.update import update_status
from server.pod.basis import basis
from server.utilities.callWebhook import call_webhook_for_inference


def inferencePod(uid):
    try:
        update_status(uid, "downloading model", "simulation", "model_id")
        runner = basis(uid)
        model = runner.load()
        update_status(uid, "model is loaded", "simulation", "model_id")
        call_webhook_for_inference(uid)
        return model
    except Exception as e:
        print(f"Inference for model {uid} failed: {e}")
        update_status(uid, "inference failed", "simulation", "model_id")
