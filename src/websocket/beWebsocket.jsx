import { useRef } from "react";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { recreateEnv, wipeEntities } from "../engine/utility/recreate";
import { useAuthStore } from "../stores/useAuthStore";

export function useBackendWebSocket(onModelReady) {
  const socketRef = useRef(null);
  const intentionalClose = useRef(false);
  const { setModalStage, setModeltoLoading } = useRunTimeStore.getState();
  const { user } = useAuthStore.getState();
  const connectSocket = async (item) => {
    if (socketRef.current) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/trainer/run-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_uid: item.training_id,
          user_uid: user?.id,
        }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const rep = await res.json();

      const entities = rep.entities;
      const session_id = rep.session_id;
      const token_id = rep.jwt_token;
      localStorage.setItem("session_token", session_id);
      localStorage.setItem("jwt_token", token_id);
      setModalStage("env_fetched_from_backend");
      wipeEntities(); //wiping the current env
      recreateEnv(entities); //recreating the env from entities dict we got from python
    } catch (err) {
      console.error("Failed to start inference:", err);
      return;
    }

    const socket = new WebSocket(
      "wss://ureterointestinal-leilani-unspiritualised.ngrok-free.dev/ws",
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to backend WS");
      setModalStage("connecting_to_cloud");
      setModeltoLoading(true); //model is loading
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Event:", data);

        if (data.status === "READY") {
          setModalStage("model_loaded_on_cloud");
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
        setTimeout(() => connectSocket(item), 2000);
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
