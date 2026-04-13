// OBS -> controller -> actuator -> physics -> BG
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";
import discretize from "../utility/discretization.js";

export default function runTimeloop(entities) {
  const { playing, training } = useRunTimeStore.getState();
  const { currentExperimentId, isModelLoading, isModelReady } =
    useRunTimeStore.getState();

  if (!playing || training) return;
  console.log("Runtime Loop");
  Object.values(entities).forEach((entity) => {
    //We will go through each entity
    if (
      entity.isDecor ||
      !entity.action_space ||
      entity.isPickable ||
      entity.isTarget
    ) {
      return;
    }
    const observation_space = buildObsSpace(entity); //Here we will build the obs space and then give it to controller
    // const state_key = discretize(observation_space, entity);
    const action_space = entity.action_space;
    const qTable = null;
    const action = ControllerRouter(
      observation_space,
      entity.id,
      action_space,
      currentExperimentId,
      qTable,
      "playing",
      isModelReady,
    ); //This will give us action

    if (action !== null && action !== undefined) {
      console.log("Action are applied Locally");
      applyAction(action, entity, observation_space);
    }
  });
}
