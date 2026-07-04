import numpy as np
import torch
from fastapi import FastAPI, WebSocket

from server.pod.jwt_token.generateJWT import verify_token
from server.utilities.refined import actionMasking, actionMaskingArray, actionTranslator

model = None


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def predict_action(self, obs: list, capability: list, current_behavior: str):
        obs = np.array(obs, dtype=np.float32)
        actions, _ = actionMasking(capability)

        mask = [False] * len(actions)
        maskedArray = actionMaskingArray(mask, actions, current_behavior, obs)

        action_predicted, _ = model.predict(
            obs, action_masks=maskedArray, deterministic=True
        )

        # added the prob check
        obs_np = np.asarray(obs, dtype=np.float32)
        if obs_np.ndim == 1:
            obs_np = obs_np.reshape(1, -1)

        obs_tensor = torch.as_tensor(obs_np).float().to(model.device)
        mask_tensor = torch.as_tensor(maskedArray).to(model.device)

        with torch.no_grad():
            dist = model.policy.get_distribution(obs_tensor, action_masks=mask_tensor)
            probs = dist.distribution.probs.cpu().numpy()[0]

        action_idx = (
            int(action_predicted.item())
            if hasattr(action_predicted, "item")
            else int(action_predicted)
        )

        print("---- ACTION PROBABILITIES ----", flush=True)

        for i, prob in enumerate(probs):
            action_name = actions[i] if i < len(actions) else f"unknown_{i}"
            print(
                f"{i}: {action_name:<10} -> {prob:.4f} ({prob * 100:.2f}%)", flush=True
            )

        print("------------------------------", flush=True)
        print("RAW MODEL ACTION:", action_idx, flush=True)
        print("RAW ARGMAX ACTION:", int(probs.argmax()), flush=True)
        print("AVAILABLE ACTIONS:", actions, flush=True)
        print("TRANSLATED ACTION:", actionTranslator(action_idx, actions), flush=True)

        return {
            "action": actionTranslator(action_predicted, actions),
            "probs": [
                {"action": actions[i], "prob": round(float(prob), 4)}
                for i, prob in enumerate(probs)
            ],
        }


app = FastAPI()
manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            token = data["jwt_token"]
            agent_id = data["agentId"]
            capability = data["cap"]
            current_behavior = data["behavior"]
            seq = data["seq"]
            status = verify_token(token)
            if status:
                print(f"Received: {data}", flush=True)
                obs = data["obs"]
                result = await manager.predict_action(obs, capability, current_behavior)
                action = result["action"]
                print(f"Sent: {action}", flush=True)
                result = await manager.predict_action(obs, capability, current_behavior)

                await websocket.send_json(
                    {
                        "seq": seq,
                        "action": result["action"],
                        "probs": result["probs"],
                        "session_id": data["session_token"],
                        "agent_id": agent_id,
                    }
                )
            else:
                await websocket.close()
                return
    except Exception as e:
        print("WebSocket error:", e, flush=True)
        manager.disconnect(websocket)
