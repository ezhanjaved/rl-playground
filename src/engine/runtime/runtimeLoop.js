// OBS -> controller -> actuator -> physics -> BG
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";
import { flushActions } from "./actionQueue.js";

export default function runTimeloop(entities) {
  const { playing, training } = useRunTimeStore.getState();
  const { currentExperimentId, isModelReady, seq, setSeq } =
    useRunTimeStore.getState();

  if (!playing || training) return;

  const incoming = flushActions();
  incoming.forEach((action, agentId) => {
    const entity = entities[agentId];
    if (entity) {
      applyAction(action, entity, []);
    }
  });

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
    console.log("Obs: " + observation_space);
    const action_space = entity.action_space;
    const sequence = seq[entity.id] ?? 0; //Read sequence number from store
    const newSeq = sequence + 1; //increment it
    const action = ControllerRouter(
      newSeq,
      observation_space,
      entity.id,
      action_space,
      currentExperimentId,
      null,
      "playing",
      isModelReady,
    );

    // const action = getNextAction(action_space);
    console.log("Action: ", action, " Seq: ", newSeq);
    if (action !== null && action !== undefined) {
      applyAction(action, entity, observation_space);
    }
    setSeq(entity.id, newSeq); //set it back in store
  });
}
