import { useSceneStore } from "../stores/useSceneStore";
import { useGraphStore } from "../stores/useGraphStore";
import { useAuthStore } from "../stores/useAuthStore";

export async function uploadEnv(setMessage, setInfoModal) {
  const { user } = useAuthStore.getState();
  const { entities } = useSceneStore.getState();
  const body = {
    data: entities,
    type: "env",
    user_id: user?.id,
    name: entities?.name,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/export-template`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    setMessage(result.message);
    setInfoModal(true);
    console.log("Result from the server: " + JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}

export async function uploadGraph(id, setMessage, setInfoModal) {
  const { user } = useAuthStore.getState();
  const { graphs } = useGraphStore.getState();
  const graphPicked = graphs[id];
  const body = {
    data: graphPicked,
    user_id: user?.id,
    name: graphPicked?.name,
    type: "graph",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/export-template`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    setMessage(result.message);
    setInfoModal(true);
    console.log("Result from the server: " + JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}
