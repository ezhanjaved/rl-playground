import os
import subprocess

from dotenv import load_dotenv

load_dotenv()


def connectToPod(remote_cmd):
    ROOT = os.getenv("SSH_ROOT")
    KEY_PATH = os.getenv("SSH_KEY_PATH")
    if not ROOT:
        raise ValueError("SSH_ROOT not set")
    if not KEY_PATH:
        raise ValueError("SSH_KEY_PATH not set")

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
