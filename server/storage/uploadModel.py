import os

from storage.r2Client import s3


def uploadModel(path, id):
    model_folder = f"model_training_{id}"
    model_name = f"model_{id}.zip"
    s3.upload_file(path, "rl-models", f"{model_folder}/{model_name}")
    return f"rl-models/{model_folder}/{model_name}"


def uploadConfig(path):
    bucket_name = "rl-models"
    folder_prefix = os.path.basename(path)
    config_path = f"{bucket_name}/{folder_prefix}"
    for file in os.listdir(path):
        file_path = os.path.join(path, file)

        if os.path.isfile(file_path):
            s3.upload_file(file_path, bucket_name, f"{folder_prefix}/{file}")
    return str(config_path)
