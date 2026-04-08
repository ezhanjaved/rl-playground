import sys

from runPod import runpod_job

if __name__ == "__main__":
    uid = sys.argv[1]
    print(f"Starting training for model: {uid}")
    runpod_job(uid)
