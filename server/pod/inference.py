import traceback

from server.database.update import update_status
from server.pod.basis import basis
from server.storage.downloadModel import downloadModel

def inferencePod(uid):
    try:
        update_status(uid, "downloading model", "simulation", "model_id")
        runner = basis(uid)
        print(f"[inference] basis() created for {uid}")
        downloadModel(uid)
        print(
            f"[inference] downloadModel() complete for {uid}"
        )  # if this never prints, download is the hang
        model = runner.load()
        print(f"[inference] runner.load() returned: {model}")
        return model
    except Exception:
        print(f"Inference for model {uid}")
        tb = traceback.format_exc()
        print(tb)
        update_status(uid, "inference failed", "simulation", "model_id")
        raise
