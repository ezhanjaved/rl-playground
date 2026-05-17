from server.celery_app.celery_worker import celery_app
from server.celery_app.connectionPod import connectToPod
from server.database.update import update_model, update_status


@celery_app.task(name="rl_resume", bind=True, max_retries=3)
def rl_resume(self, uid: str, steps: int):
    try:
        update_status(uid, "queued", "models", "training_id")
        remote_cmd = f"""
        cd /workspace/rl-playground
        nohup server/venv/bin/python -m server.pod.trigger_resume {uid} {steps} > server/pod/trigger_resume.log 2>&1 &
        exit
        """
        connectToPod(remote_cmd)
    except ConnectionError as e:
        try:
            raise self.retry(exc=e, countdown=10 * (2**self.request.retries))
        except self.MaxRetriesExceededError:
            update_model(
                uid, {"status": "failed", "error": str(e)}, "models", "training_id"
            )
            raise
    except Exception as e:
        update_model(
            uid, {"status": "failed", "error": str(e)}, "models", "training_id"
        )
        raise
