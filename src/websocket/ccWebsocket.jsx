import { useRef } from "react";

export function useCloudComputerWebSocket(onMessage) {
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

        console.log("Action:", data);
        onMessage?.(data);
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

  const sendMessage = (data) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.log("Socket not connected");
    }
  };

  return {
    connectSocket,
    sendMessage,
    disconnectSocket,
  };
}
