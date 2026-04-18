// OBS -> controller -> actuator -> physics -> BG
import discretize from "../utility/discretization.js";
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";

export default function runTimeloop(entities) {
  const { playing, training } = useRunTimeStore.getState();
  const { currentExperimentId, isModelReady } = useRunTimeStore.getState();

  if (!playing || training) return;

  Object.values(entities).forEach((entity) => {
    if (
      entity.isDecor ||
      !entity.action_space ||
      entity.isPickable ||
      entity.isTarget
    )
      return;

    const observation_space = buildObsSpace(entity);
    const action_space = entity.action_space;

    const action = ControllerRouter(
      observation_space,
      entity.id,
      action_space,
      currentExperimentId,
      null,
      "playing",
      isModelReady,
    );

    // PPO returns null — action will be applied by ccWebsocket callback, not here
    if (action !== null && action !== undefined) {
      console.log("Actions are applied locally");
      applyAction(action, entity, observation_space);
    }
  });
}
