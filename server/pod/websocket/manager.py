import numpy as np
import torch
from fastapi import FastAPI, WebSocket

from server.pod.jwt_token.generateJWT import verify_token
from server.utilities.refined import actionMasking, actionTranslator

model = None


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def predict_action(self, obs: list, capability: list):
        obs = np.array(obs, dtype=np.float32)
        actions, _ = actionMasking(capability)
        action_predicted, _ = model.predict(obs, deterministic=True)

        # added the prob check
        obs_np = np.asarray(obs, dtype=np.float32)
        if obs_np.ndim == 1:
            obs_np = obs_np.reshape(1, -1)

        obs_tensor = torch.as_tensor(obs_np).float().to(model.device)

        with torch.no_grad():
            dist = model.policy.get_distribution(obs_tensor)
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

        return actionTranslator(action_predicted, actions)


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
            seq = data["seq"]
            status = verify_token(token)
            if status:
                print(f"Received: {data}", flush=True)
                obs = data["obs"]
                action = await manager.predict_action(obs, capability)
                print(f"Sent: {action}", flush=True)
                await websocket.send_json(
                    {
                        "seq": seq,
                        "action": action,
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
