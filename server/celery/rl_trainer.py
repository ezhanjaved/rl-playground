from celery.celery_worker import celery_app
from database.update import update_model, update_status
from pod.runPod import runpod_job


@celery_app.task(bind=True)
def rl_trainer(self, uid: str):
    try:
        update_status(uid, "queued")
        runpod_job(uid)  # trigger runpod
    except Exception as e:
        update_model(uid, {"status": "failed", "error": str(e)})
        raise
