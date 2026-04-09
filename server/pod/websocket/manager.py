from fastapi import FastAPI, WebSocket

from server.pod.jwt_token.generateJWT import verify_token
from server.utilities.refined import actionTrasnlator

model = None


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def predict_action(self, obs: list):
        action_predicted = model.predict(obs)
        refined_action_predicted = actionTrasnlator(action_predicted)
        return refined_action_predicted


app = FastAPI()
manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            token = data["token"]
            status = verify_token(token)

            if status:
                obs = data["obs"]
                action = await manager.predict_action(obs)
                await websocket.send_json(
                    {"action": action, "session_id": data["session_id"]}
                )
            else:
                await websocket.close()
                return

    except:
        manager.disconnect(websocket)
