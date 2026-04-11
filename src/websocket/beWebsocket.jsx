import { useRef } from "react";

export function useBackendWebSocket(onModelReady) {
  const socketRef = useRef(null);

  const connectSocket = () => {
    if (socketRef.current) return;

    const socket = new WebSocket("wss://your-backend-domain/ws");

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to backend WS");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("Event:", data);

        if (data.status === "READY") {
          onModelReady();
        }
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ Disconnected");
      socketRef.current = null;
      setTimeout(connectSocket, 2000);
    };

    socket.onerror = (err) => {
      console.error("WS Error:", err);
    };
  };

  const disconnectSocket = () => {
    socketRef.current?.close();
    socketRef.current = null;
  };

  return {
    connectSocket,
  };
}
