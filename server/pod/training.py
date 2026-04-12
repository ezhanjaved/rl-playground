from server.database.update import update_model, update_status
from server.pod.basis import basis
from server.storage.uploadModel import uploadModel
from server.utilities.callWebhook import call_webhook_for_training


def trainingPod(uid: str):
    # call runpod
    update_status(uid, "training", "models", "training_id")
    try:
        trainer = basis(uid)
        trainer.train()
        update_status(uid, "training is complete", "models", "training_id")
        local_path = trainer.save()
        s3Path = uploadModel(uid, local_path)
        update_status(uid, "model is saved", "models", "training_id")
        call_webhook_for_training(uid, s3Path)
        update_status(uid, "webhook is pinged", "models", "training_id")
    except Exception as e:
        print(f"Training for model {uid} failed: {e}")
        update_model(
            uid, {"status": "failed", "error": str(e)}, "models", "training_id"
        )
