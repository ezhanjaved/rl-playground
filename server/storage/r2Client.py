import os

import boto3
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    "s3",
    endpoint_url=os.getenv("R2_S3_ENDPOINT"),
    aws_access_key_id=os.getenv("R2_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
    region_name="auto",
)
