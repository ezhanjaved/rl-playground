import os

from celery import Celery
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("RABBIT_MQ_URL")

broker_url = url
celery_app = Celery("worker", broker=str(broker_url))
celery_app.conf.update(task_routes={"rl-trainer.*": {"queue": "celery"}})
