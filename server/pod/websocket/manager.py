import numpy as np
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
        action_predicted, _ = model.predict(obs)
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
            status = verify_token(token)
            if status:
                print(f"Received: {data}", flush=True)
                obs = data["obs"]
                action = await manager.predict_action(obs, capability)
                print(f"Sent: {action}", flush=True)
                await websocket.send_json(
                    {
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
