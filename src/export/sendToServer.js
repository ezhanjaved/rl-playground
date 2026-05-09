// POST env_spec to backend
import { useSceneStore } from "../stores/useSceneStore";
import { useGraphStore } from "../stores/useGraphStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useAuthStore } from "../stores/useAuthStore";

export async function sendServer() {
  const { entities, assignments } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();
  const { modelName, envType, timesteps } = useRunTimeStore.getState();
  const { user } = useAuthStore.getState();
  const data = {
    entities,
    graphs,
    assignments,
    user_uid: user?.id,
    modelName,
    envType,
    timesteps,
  };
  console.log("Body: " + JSON.stringify(data, null, 2));
  // const empty = emptyRoutine(data);
  // if (empty) return;

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/trainer/export-data-debug",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log("Result from the server: " + JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}

const emptyRoutine = (completeData) => {
  const inArray = Object.entries(completeData);

  for (const element of inArray) {
    const value = element[1];

    const isEmpty = emptyCheck(value);
    if (isEmpty) {
      return true;
    }
  }

  return false;
};

const emptyCheck = (jsonData) => {
  const keys = Object.keys(jsonData);
  return keys.length === 0;
};
