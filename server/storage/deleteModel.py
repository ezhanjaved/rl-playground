from server.storage.r2Client import s3


def delete_model(model_id):
    bucket = "rl-models"
    prefix = f"model_training_{model_id}/"

    response = s3.list_objects_v2(Bucket=bucket, Prefix=prefix)

    contents = response.get("Contents", [])

    if not contents:
        return False

    for obj in contents:
        s3.delete_object(Bucket=bucket, Key=obj["Key"])

    return True


def delete_template(temp_name):
    bucket = "templates"

    try:
        s3.delete_object(Bucket=bucket, Key=temp_name)
        return True

    except Exception as e:
        print(f"Delete failed: {e}")
        return False
