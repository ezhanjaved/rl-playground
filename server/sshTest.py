import os

import paramiko
from dotenv import load_dotenv

load_dotenv()


def triggerRemote():
    key_path = os.getenv("SSH_KEY_PATH")

    username = "k9co1bxgp1ct5w-6441153d"
    host = "ssh.runpod.io"
    port = 22

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        client.connect(
            hostname=host,
            port=port,
            username=username,
            key_filename=key_path,
            timeout=15,
        )

        channel = client.get_transport().open_session()
        channel.get_pty()
        channel.exec_command(
            "nohup /workspace/rl-playground/server/venv/bin/python "
            "/workspace/rl-playground/server/testing.py "
            "> /workspace/rl-playground/server/testing.log 2>&1 &"
        )
        print("Triggered successfully.")

    except Exception as e:
        print(f"SSH error: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    triggerRemote()
