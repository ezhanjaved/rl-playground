// POST env_spec to backend
import { useSceneStore } from "../stores/useSceneStore";
import { useGraphStore } from "../stores/useGraphStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useAuthStore } from "../stores/useAuthStore";
import { recreateEnv, wipeEntities } from "../engine/utility/recreate";

export async function changeConfig(id) {
  const { entities, assignments, highestDistance } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();
  const { timesteps, envMode, percentageFixedEp, maxStepPerEp } =
    useRunTimeStore.getState();
  const { user, envPer, graphPer, configPer } = useAuthStore.getState();

  let random_spawn_after_episode = null;

  if (envMode === "Curriculum") {
    const num_envs = 8;
    const total_timesteps = timesteps;
    const max_steps_per_episode = maxStepPerEp;
    const max_episodes = total_timesteps / max_steps_per_episode;
    console.log("MAX EPISODES (FLOOR): " + max_episodes);
    const user_defined_fixed_ep_per = percentageFixedEp;
    random_spawn_after_episode = Number(
      (max_episodes / num_envs) * user_defined_fixed_ep_per,
    );
  }
  console.log("Spawn Mode: ", envMode);
  console.log("RSAE: " + random_spawn_after_episode);

  const data = {
    entities,
    graphs,
    assignments,

    environChange: envPer,
    graphChange: graphPer,
    configChange: configPer,

    user_uid: user?.id,
    model_uid: id,
    timesteps,
    highestDistance: highestDistance,
    spawnMode: envMode,
    randomSpawnAfterEp: random_spawn_after_episode,
  };

  console.log("Body: " + JSON.stringify(data, null, 2));
  // const empty = emptyRoutine(data);
  // if (empty) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/trainer/change-config`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
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

export async function importConfig(model_id) {
  const { user } = useAuthStore.getState();
  const { setName } = useSceneStore.getState();
  const { addGraphWithId } = useGraphStore.getState();

  const body = {
    model_uid: model_id,
    user_uid: user.id,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/trainer/fetch_current_config`,
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
    if (result.status === 1) {
      wipeEntities();
      recreateEnv(result.entities);

      const graphObj = result.graphs;
      const graphs = Object.keys(graphObj);

      for (const graph of graphs) {
        const graphId = graphObj[graph].id;
        addGraphWithId(graphId, graphObj[graph]);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
