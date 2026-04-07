import sys

from runPod import runpod_job

if __name__ == "__main__":
    uid = sys.argv[1]
    runpod_job(uid)
