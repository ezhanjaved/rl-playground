import os

from celery import Celery
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("RABBIT_MQ_URL")

broker_url = url
celery_app = Celery("worker", broker=str(broker_url))
celery_app.conf.update(
    task_routes={
        "rl_trainer": {"queue": "celery"},
        "rl_inference": {"queue": "celery"},
        "rl_test": {"queue": "celery"},
    }
)

import server.celery_app.rl_inference
import server.celery_app.rl_test
import server.celery_app.rl_trainer
