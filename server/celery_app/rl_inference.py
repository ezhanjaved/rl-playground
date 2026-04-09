from server.celery_app import celery_worker
from server.database.update import update_model, update_status


@celery_worker.celery_app.task(bind=True, max_retries=3)
def runningThemodel(uid: str):
    try:
        update_status(uid, "connecting", "simulation", "model_id")
        # connect to pod
        update_status(uid, "running", "simulation", "model_id")
    except Exception as e:
        update_model(
            uid, {"status": "failed", "error": str(e)}, "simulation", "model_id"
        )
        raise
