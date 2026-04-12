import hashlib
import hmac
import json
import os
import time

import requests

WEBHOOK_URL_TRAINING = str(os.getenv("WEBHOOK_URL_TRAINING"))
WEBHOOK_URL_INFERENCE = str(os.getenv("WEBHOOK_URL_INFERENCE"))
SECRET = os.getenv("WEB_SECRET")


def call_webhook_for_training(uid: str, path: str):
    if not SECRET:
        raise ValueError("WEB_SECRET is not set in environment variables")
    payload = {"model_id": uid, "path": path, "timestamp": int(time.time())}
    body = json.dumps(payload, separators=(",", ":")).encode()
    signature = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "x-signature": signature}
    response = requests.post(WEBHOOK_URL_TRAINING, data=body, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Webhook failed: {response.status_code} - {response.text}")
    return response.json()


def call_webhook_for_inference(uid: str):
    if not SECRET:
        raise ValueError("WEB_SECRET is not set in environment variables")
    payload = {"model_id": uid, "timestamp": int(time.time())}
    body = json.dumps(payload, separators=(",", ":")).encode()
    signature = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "x-signature": signature}
    response = requests.post(WEBHOOK_URL_INFERENCE, data=body, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Webhook failed: {response.status_code} - {response.text}")
    return response.json()
