import { useRef } from "react";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { recreateEnv, wipeEntities } from "../engine/utility/recreate";
export function useBackendWebSocket(onModelReady) {
  const socketRef = useRef(null);
  const intentionalClose = useRef(false);

  const setModeltoLoading = useRunTimeStore((s) => s.setModeltoLoading);

  const connectSocket = async (item) => {
    if (socketRef.current) return;
    console.log("Item: " + JSON.stringify(item, null, 2));
    try {
      const res = await fetch("http://127.0.0.1:8000/trainer/run-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: item.id, user_id: "" }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const rep = await res.json();

      const entities = rep.entities;
      const session_id = rep.session_id;
      const token_id = rep.jwt_token;
      localStorage.setItem("session_token", session_id);
      localStorage.setItem("jwt_token", token_id);
      wipeEntities(); //wiping the current env
      recreateEnv(entities); //recreating the env from entities dict we got from python
    } catch (err) {
      console.error("Failed to start inference:", err);
      return;
    }

    const socket = new WebSocket("ws://127.0.0.1:8000/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to backend WS");
      setModeltoLoading();
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Event:", data);

        if (data.status === "READY") {
          onModelReady(data.pod_url); // pass pod_url from server to caller
        }
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ Disconnected from backend WS");
      socketRef.current = null;
      if (!intentionalClose.current) {
        setTimeout(() => connectSocket(item), 2000); // only reconnect if unexpected
      }
      intentionalClose.current = false;
    };

    socket.onerror = (err) => {
      console.error("WS Error:", err);
    };
  };

  const disconnectSocket = () => {
    intentionalClose.current = true;
    socketRef.current?.close();
    socketRef.current = null;
  };

  return { connectSocket, disconnectSocket };
}
