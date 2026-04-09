from server.database.update import update_status
from server.pod.basis import basis
from server.storage.uploadModel import uploadModel
from server.utilities.callWebhook import call_webhook


def trainingPod(uid: str):
    # call runpod
    update_status(uid, "training", "models", "training_id")
    trainer = basis(uid)
    trainer.train()
    local_path = trainer.save()
    s3Path = uploadModel(uid, local_path)
    update_status(uid, "saved", "models", "training_id")
    call_webhook(uid, s3Path)
