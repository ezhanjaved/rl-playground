"""
Whitebox Testing — trainer.py
Manual endpoint tests (no mocking, hits real server)
"""

import requests

BASE = "http://127.0.0.1:8000/trainer"


def test_export_data():
    print("\n--- TC-01: POST /export-data ---")
    payload = {
        "entities": {
            "agent_1": {
                "type": "agent",
                "position": [0, 0],
                "action_space": ["up", "down"],
            }
        },
        "graphs": {"reward_graph": {"x": [], "y": []}},
        "assignments": {"agent_1": {"algorithm": "ppo", "learning_rate": 0.001}},
    }
    res = requests.post(f"{BASE}/export-data", json=payload)
    data = res.json()
    print("Status Code:", res.status_code)
    print("Response:", data)
    assert data["status"] == 1, "FAIL: expected status 1"
    assert "id" in data, "FAIL: no model id returned"
    print("PASS — model_id:", data["id"])
    return data["id"]


def test_run_model(model_id):
    print("\n--- TC-02: POST /run-model ---")
    payload = {
        "model_uid": model_id,
        "user_uid": "125810d4-6d11-4d7d-9804-e472a261d345",
    }
    res = requests.post(f"{BASE}/run-model", json=payload)
    data = res.json()
    print("Status Code:", res.status_code)
    print("Response:", data)
    assert data["status"] == 1, f"FAIL: expected status 1, got: {data.get('message')}"
    assert "session_id" in data, "FAIL: no session_id returned"
    assert "user_id" in data, "FAIL: no user_id returned"
    assert "jwt_token" in data, "FAIL: no jwt_token returned"
    assert "entities" in data, "FAIL: no entities returned"
    print("PASS — session_id:", data["session_id"])


def test_fetch_models():
    print("\n--- TC-03: POST /fetch_models ---")
    payload = {
        "user_uid": "125810d4-6d11-4d7d-9804-e472a261d345",
        "model_uid": "",
    }
    res = requests.post(f"{BASE}/fetch_models", json=payload)
    data = res.json()
    print("Status Code:", res.status_code)
    print("Response:", data)
    assert data["status"] == 1, "FAIL: expected status 1"
    assert isinstance(data["models"], list), "FAIL: models should be a list"
    print(f"PASS — {len(data['models'])} model(s) returned")


if __name__ == "__main__":
    print("=" * 50)
    print("  Whitebox Test Suite — trainer.py")
    print("=" * 50)

    model_id = test_export_data()
    test_run_model(model_id)
    test_fetch_models()

    print("\n" + "=" * 50)
    print("  All tests completed")
    print("=" * 50)
