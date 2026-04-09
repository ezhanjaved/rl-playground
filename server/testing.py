import time
from pathlib import Path

from server.database.update import update_model

# from storage.uploadModel import uploadConfig
# from database.insert import create_model
# from database.update import update_status
# from downloadModel import download_from_s3

# def uploadingToBucket():
#     current_path = Path.cwd()
#     folder_path = Path(
#         current_path / "data" / "model_training_0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     )
#     path = uploadConfig(folder_path)
#     print("Path: ", path)

# uploadingToBucket()

# def testCreateModel():
#     config_path = "rl-models/model_training_0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     model_id = "0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     data = {"training_id": model_id, "config_path": config_path}
#     result = create_model(data)
#     print(result)

# def testUpdateStatus():
#     model_id = "0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     update_status(model_id, "running")

# testUpdateStatus()

# def testDownloadS3():
#     model_id = "0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     download_from_s3(model_id)


# def testUpdateModel():
#     id = "0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f"
#     path = "a/b"
#     update_model(id, {"status": "completed", "model_path": path})


# testDownloadS3()
#
# testUpdateModel()


def test():
    print(time.time())


test()
