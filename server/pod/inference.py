from server.database.update import update_status
from server.pod.basis import basis
from server.utilities.callWebhook import call_webhook_for_inference


def inferencePod(uid):
    update_status(uid, "downloading model", "simulation", "model_id")
    runner = basis(uid)
    model = runner.load()
    update_status(uid, "model is loaded", "simulation", "model_id")
    call_webhook_for_inference(uid)
    return model
