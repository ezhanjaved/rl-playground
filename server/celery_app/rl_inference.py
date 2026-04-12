from server.celery_app.celery_worker import celery_app
from server.celery_app.connectionPod import connectToPod
from server.database.update import update_model, update_status


@celery_app.task(name="rl_inference", bind=True, max_retries=3)
def rl_inference_celery(self, uid: str):
    try:
        update_status(uid, "connecting", "simulation", "model_id")
        # connect to pod
        remote_cmd = f"""
        cd /workspace/rl-playground
        nohup server/venv/bin/python -m server.trigger_inference {uid} > server/trigger_inference.log 2>&1 &
        exit
        """
        connectToPod(remote_cmd)
        update_status(uid, "running", "simulation", "model_id")
    except ConnectionError as e:
        try:
            raise self.retry(exc=e, countdown=10 * (2**self.request.retries))
        except self.MaxRetriesExceededError:
            update_model(
                uid, {"status": "failed", "error": str(e)}, "simulation", "model_id"
            )
            raise
    except Exception as e:
        update_model(
            uid, {"status": "failed", "error": str(e)}, "simulation", "model_id"
        )
        raise
