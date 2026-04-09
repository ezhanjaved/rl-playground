import os
import subprocess

from dotenv import load_dotenv

from server.celery_app.celery_worker import celery_app
from server.database.update import update_model, update_status

load_dotenv()


@celery_app.task(bind=True, max_retries=3)
def rl_trainer_celery(self, uid: str):
    try:
        update_status(uid, "queued", "models", "training_id")
        connectToPod(uid)
        update_status(uid, "training", "models", "training_id")
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


def connectToPod(uid: str):
    ROOT = os.getenv("SSH_ROOT")
    KEY_PATH = os.getenv("SSH_KEY_PATH")
    if not ROOT:
        raise ValueError("SSH_ROOT not set")
    if not KEY_PATH:
        raise ValueError("SSH_KEY_PATH not set")

    remote_cmd = (
        f"nohup bash -c 'cd /workspace/rl-playground/server/pod && "
        f"python trigger.py {uid}' "
        f"> /workspace/rl-playground/server/pod/trigger.log 2>&1 &"
    )

    process = subprocess.Popen(
        [
            "ssh",
            "-T",
            "-i",
            KEY_PATH,
            "-o",
            "StrictHostKeyChecking=no",
            "-o",
            "UserKnownHostsFile=/dev/null",
            "-o",
            "ConnectTimeout=10",
            ROOT,
            remote_cmd,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    try:
        _, stderr = process.communicate(timeout=15)
        if process.returncode != 0:
            raise ConnectionError(f"SSH failed: {stderr.decode().strip()}")
    except subprocess.TimeoutExpired:
        process.kill()
        raise ConnectionError("SSH connection timed out")
