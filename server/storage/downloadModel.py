import os
from pathlib import Path

from r2Client import s3


def downloadModel(id):
    file_name = f"model_training_{id}/model_{id}.zip"
    parent_dir = Path.cwd().parent
    download_model_path = parent_dir / "training" / "trainer" / "models"
    download_model_path.mkdir(parents=True, exist_ok=True)
    full_path = download_model_path / file_name
    s3.download_file("rl-models", file_name, str(full_path))
    return f"{file_name} is downloaded from the bucket to {download_model_path}"


def download_from_s3(uid):
    bucket_name = "rl-models"
    prefix = f"model_training_{uid}/"
    local_dir = f"model_training_{uid}"

    parent_dir = Path.cwd().parent
    folder_dir = Path(parent_dir / "data" / local_dir)

    os.makedirs(folder_dir, exist_ok=True)

    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)

    if "Contents" not in response:
        print("No files found for this UID.")
        return

    for obj in response["Contents"]:
        key = obj["Key"]

        if key.endswith("/"):
            continue

        file_name = os.path.basename(key)

        local_path = os.path.join(folder_dir, file_name)

        s3.download_file(bucket_name, key, local_path)

    print(f"Downloaded files to {folder_dir}/")
