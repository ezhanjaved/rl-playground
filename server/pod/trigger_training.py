import sys

from server.pod.training import trainingPod

if __name__ == "__main__":
    uid = sys.argv[1]
    print(f"Starting training for the model: {uid}")
    trainingPod(uid)
