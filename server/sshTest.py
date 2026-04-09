from dotenv import load_dotenv

from server.celery_app.connectionPod import connectToPod

load_dotenv()


def triggerRemote():
    remote_cmd = (
        f"nohup bash -c 'cd /workspace/rl-playground && "
        f"server/venv/bin/python -m server.hey ezhan"
        f"> /workspace/rl-playground/server/hey.log 2>&1 &"
    )
    connectToPod(remote_cmd)


if __name__ == "__main__":
    triggerRemote()