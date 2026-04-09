from dotenv import load_dotenv

from server.celery_app.connectionPod import connectToPod

load_dotenv()


def triggerRemote():
    command = f"""
    cd /workspace/rl-playground
    nohup server/venv/bin/python -m server.hey ezhan > server/hey.log 2>&1 &
    exit
    """
    connectToPod(command)


if __name__ == "__main__":
    triggerRemote()
