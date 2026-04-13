// POST env_spec to backend
import { useSceneStore } from "../stores/useSceneStore";
import { useGraphStore } from "../stores/useGraphStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";

export async function sendServer() {
  const { entities, assignments } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();
  const { modelName, envType } = useRunTimeStore.getState();

  const data = {
    entities,
    graphs,
    assignments,
    user_uid: "125810d4-6d11-4d7d-9804-e472a261d345",
    modelName,
    envType,
  };

  const empty = emptyRoutine(data);
  if (empty) return;

  try {
    console.log("Body: " + JSON.stringify(data, null, 2));
    const response = await fetch(
      "https://ureterointestinal-leilani-unspiritualised.ngrok-free.dev/trainer/export-data",
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
