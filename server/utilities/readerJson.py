import json


def read_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)
