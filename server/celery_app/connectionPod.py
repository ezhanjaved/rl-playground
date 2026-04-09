import os
import subprocess

from dotenv import load_dotenv

load_dotenv()


def connectToPod(remote_cmd: str, uid: str | None = None):
    ROOT = os.getenv("SSH_ROOT")
    KEY_PATH = os.getenv("SSH_KEY_PATH")

    if not ROOT:
        raise ValueError("SSH_ROOT not set")
    if not KEY_PATH:
        raise ValueError("SSH_KEY_PATH not set")

    ssh_command = [
        "ssh",
        "-tt",
        "-i",
        KEY_PATH,
        "-o",
        "StrictHostKeyChecking=no",
        "-o",
        "UserKnownHostsFile=/dev/null",
        "-o",
        "ConnectTimeout=10",
        ROOT,
    ]

    process = subprocess.Popen(
        ssh_command,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    try:
        stdout, stderr = process.communicate(remote_cmd, timeout=10)

        if process.returncode not in (0, None):
            raise ConnectionError(f"[UID={uid}] SSH failed:\n{stderr.strip()}")

        if stdout:
            print(f"[UID={uid}] STDOUT:\n{stdout.strip()}")
        if stderr:
            print(f"[UID={uid}] STDERR:\n{stderr.strip()}")

        print(f"[UID={uid}] SSH command dispatched successfully")

    except subprocess.TimeoutExpired:
        process.kill()
        raise ConnectionError(f"[UID={uid}] SSH connection timed out")
