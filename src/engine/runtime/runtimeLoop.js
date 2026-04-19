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
    const isDecor =
      entity.isDecor === true ||
      entity.isDecor === "true" ||
      entity.isDecor === 1;
    const isPickable =
      entity.isPickable === true ||
      entity.isPickable === "true" ||
      entity.isPickable === 1;
    const isTarget =
      entity.isTarget === true ||
      entity.isTarget === "true" ||
      entity.isTarget === 1;
    const isDeposit =
      entity.isDeposit === true ||
      entity.isDeposit === "true" ||
      entity.isDeposit === 1;

    if (isDecor || !entity.action_space || isPickable || isTarget || isDeposit)
      return;

    const observation_space = buildObsSpace(entity);
    console.log("OBS VECTOR: " + observation_space);
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

    if (action !== null && action !== undefined) {
      console.log("Actions are applied locally");
      applyAction(action, entity, observation_space);
    }
  });
}
