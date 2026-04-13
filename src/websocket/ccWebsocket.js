let socket = null;
let onActionCallback = null;

export function connectCloudSocket(podUrl, onAction) {
  if (socket) return;

  onActionCallback = onAction;

  socket = new WebSocket(`${podUrl}/ws`);

  socket.onopen = () => {
    console.log("Connected to cloud computer.");
  };

  socket.onmessage = (event) => {
    console.log("Raw from pod:", event.data);
    try {
      const data = JSON.parse(event.data);
      if (data.action && data.agent_id && onActionCallback) {
        onActionCallback(data.action, data.agent_id);
      }
    } catch (err) {
      console.error("Invalid JSON from cloud:", err);
    }
  };

  socket.onclose = () => {
    console.log("❌ Disconnected from cloud");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("Cloud WS Error:", err);
  };
}

export function sendObsToCloud(obs, session_token, jwt_token, agentId) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("Socket not ready — observation dropped");
    return;
  }
  console.log("Sending obs to cloud:", obs);
  socket.send(JSON.stringify({ obs, session_token, jwt_token, agentId }));
}
