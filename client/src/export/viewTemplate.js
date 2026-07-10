import { useAuthStore } from "../stores/useAuthStore";

export async function viewEnvs(setEnvList) {
  const { user } = useAuthStore.getState();

  const body = {
    type: "env",
    user_id: user.id,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/view-templates`,
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
    setEnvList(result.templates);
  } catch (error) {
    console.error(error);
  }
}

export async function viewGraphs(setGraphList) {
  const { user } = useAuthStore.getState();

  const body = {
    type: "graph",
    user_id: user.id,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/template/view-templates`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    setGraphList(result.templates);
  } catch (error) {
    console.error(error);
  }
}
