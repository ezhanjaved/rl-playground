import { useAuthStore } from "../stores/useAuthStore";
import { useGraphStore } from "../stores/useGraphStore";
import { recreateEnv, wipeEntities } from "../engine/utility/recreate";
import { useSceneStore } from "../stores/useSceneStore";
export async function importEnv(path) {
  const { user } = useAuthStore.getState();
  const { setName } = useSceneStore.getState();

  const body = {
    path: path,
    user_id: user.id,
    type: "env",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/import-template`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    wipeEntities();
    recreateEnv(result.data);
    setName(result.data.name);
    console.log("Result from the server: " + JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}

export async function importGraph(path) {
  const { user } = useAuthStore.getState();

  const { addGraphWithId } = useGraphStore.getState();
  const body = {
    path: path,
    user_id: user.id,
    type: "graph",
  };
  console.log("BODY: " + JSON.stringify(body, null, 2));
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/import-template`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    console.log("Result: " + JSON.stringify(result, null, 2));
    const graphObj = result.data;
    const graphId = graphObj.id;
    addGraphWithId(graphId, graphObj);
  } catch (error) {
    console.error(error);
  }
}
