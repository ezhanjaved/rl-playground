import json

from server.path_config import DATA_DIR, TEMPLATE_PATH


def json_handler(id, data):
    folder_name = f"model_training_{id}"
    folder = DATA_DIR / folder_name
    folder.mkdir(parents=True, exist_ok=True)
    try:
        json_iterator(data, folder)
        return str(folder)
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


def json_template_saver(data, file_name):
    path = TEMPLATE_PATH / file_name
    with open(path, "w") as f:
        json.dump(data, f, indent=4)
    return path


def json_template_loader(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data
