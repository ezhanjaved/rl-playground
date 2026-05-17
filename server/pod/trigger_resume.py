import sys

from server.pod.resume import resume

if __name__ == "__main__":
    uid = sys.argv[1]
    additional_steps = int(sys.argv[2])
    resume(uid, additional_steps)
