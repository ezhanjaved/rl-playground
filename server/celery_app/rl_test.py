from server.celery_app.celery_worker import celery_app
from server.celery_app.connectionPod import connectToPod


@celery_app.task(name="rl_test", bind=True)
def rl_test(self):
    print("Celery ran this test task")
    command = f"""
    cd /workspace/rl-playground
    nohup server/venv/bin/python -m server.hey ezhan > server/hey.log 2>&1 &
    exit
    """
    connectToPod(command)
