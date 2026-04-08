import os
import subprocess

from celery.celery_worker import celery_app
from database.update import update_model, update_status
from dotenv import load_dotenv

load_dotenv()


@celery_app.task(bind=True)
def rl_trainer(self, uid: str):
    try:
        update_status(uid, "queued")
        connectToPod(uid)
    except Exception as e:
        update_model(uid, {"status": "failed", "error": str(e)})
        raise


def connectToPod(uid: str):
    ROOT = os.getenv("SSH_ROOT")
    KEY_PATH = os.getenv("SSH_KEY_PATH")

    if not ROOT:
        raise ValueError("SSH_ROOT not set")

    if not KEY_PATH:
        raise ValueError("SSH_KEY_PATH not set")

    remote_cmd = f"cd /workspace/rl-playground/server/pod && python trigger.py {uid}"

    subprocess.Popen(
        [
            "ssh",
            "-i",
            KEY_PATH,
            "-o",
            "StrictHostKeyChecking=no",
            "-o",
            "UserKnownHostsFile=/dev/null",
            ROOT,
            remote_cmd,
        ]
    )
