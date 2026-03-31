import json
from pathlib import Path


def json_handler(id, data):
    folder_name = f"model_training_{id}"

    base_dir = Path(
        "C:/Users/User/Documents/GitHub/rl-playground/server/data"
    )  # hard-coded
    folder = base_dir / folder_name
    folder.mkdir(parents=True, exist_ok=True)
    try:
        json_iterator(data, folder)
    except Exception as exceptionMsg:
        print(exceptionMsg)


def json_iterator(data, path):
    keys = ["entities", "graphs", "assignments"]
    for key in keys:
        newPath = path / f"{key}.json"
        json_saver(data[key], newPath)


def json_saver(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


def json_loader(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data
