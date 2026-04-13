import hashlib
import hmac
import json
import os
import time

import requests

WEBHOOK_URL = os.getenv("WEBHOOK_URL")

if WEBHOOK_URL:
    TRAINING_WEBHOOK = f"{WEBHOOK_URL}/training-finished"
    INFERENCE_WEBHOOK = f"{WEBHOOK_URL}/model-ready"
else:
    TRAINING_WEBHOOK = None
    INFERENCE_WEBHOOK = None

SECRET = os.getenv("WEB_SECRET")


def call_webhook_for_training(uid: str, path: str):
    if not SECRET:
        raise ValueError("WEB_SECRET is not set in environment variables")
    payload = {"model_id": uid, "path": path, "timestamp": int(time.time())}
    body = json.dumps(payload, separators=(",", ":")).encode()
    signature = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "x-signature": signature}
    response = requests.post(TRAINING_WEBHOOK, data=body, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Webhook failed: {response.status_code} - {response.text}")
    return response.json()


def call_webhook_for_inference(uid: str):
    if not SECRET:
        raise ValueError("WEB_SECRET is not set in environment variables")
    payload = {
        "model_id": uid,
        "timestamp": int(time.time()),
        "url": "ws//k9co1bxgp1ct5w-8001.proxy.runpod.net",
    }
    body = json.dumps(payload, separators=(",", ":")).encode()
    signature = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "x-signature": signature}
    response = requests.post(INFERENCE_WEBHOOK, data=body, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Webhook failed: {response.status_code} - {response.text}")
    return response.json()
