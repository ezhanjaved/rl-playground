import os
from pathlib import Path

from server.storage.r2Client import s3

BUCKET = "rl-models"


def uploadModel(path, id):
    model_folder = f"model_training_{id}"
    model_name = f"model_{id}.zip"
    s3.upload_file(path, BUCKET, f"{model_folder}/{model_name}")
    return f"{BUCKET}/{model_folder}/{model_name}"


def upload_template(path, template_name):
    s3.upload_file(path, "templates", template_name)
    return template_name


def uploadConfig(path):
    folder_prefix = os.path.basename(path)
    config_path = f"{BUCKET}/{folder_prefix}"
    for file in os.listdir(path):
        file_path = os.path.join(path, file)
        if os.path.isfile(file_path):
            s3.upload_file(file_path, BUCKET, f"{folder_prefix}/{file}")
    return str(config_path)


def uploadCheckpoint(local_path: str, uid: str, checkpoint_name: str) -> str:
    key = f"model_training_{uid}/checkpoints/{checkpoint_name}"
    s3.upload_file(local_path, BUCKET, key)
    return f"{BUCKET}/{key}"


def downloadLatestCheckpoint(uid: str, local_dir: Path) -> Path | None:
    prefix = f"model_training_{uid}/checkpoints/"
    response = s3.list_objects_v2(Bucket=BUCKET, Prefix=prefix)

    if "Contents" not in response:
        return None

    keys = [obj["Key"] for obj in response["Contents"] if obj["Key"].endswith(".zip")]

    if not keys:
        return None

    latest_key = sorted(keys)[-1]
    checkpoint_name = os.path.basename(latest_key)

    local_dir.mkdir(parents=True, exist_ok=True)
    local_path = local_dir / checkpoint_name

    print(f"Downloading latest checkpoint: {latest_key}")
    s3.download_file(BUCKET, latest_key, str(local_path))
    return local_path
