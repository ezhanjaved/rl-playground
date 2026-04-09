from server.database.update import update_status
from server.pod.basis import basis


def inferencePod(uid):
    update_status(uid, "downloading model", "simulation", "model_id")
    runner = basis(uid)
    model = runner.load()
    update_status(uid, "model is loaded", "simulation", "model_id")
    return model
