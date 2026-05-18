import { useAuthStore } from "../stores/useAuthStore";

export async function deleteModel(training_id) {
  const { user } = useAuthStore.getState();

  const body = {
    user_uid: user.id,
    model_uid: training_id,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/trainer/delete_model`,
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
    console.log("Result from the server: " + JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}
