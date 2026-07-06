// OBS -> controller -> actuator -> physics -> BG
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";
// import { flushActions } from "./actionQueue.js";
import { useSceneStore } from "../../stores/useSceneStore.js";
import { BehaviorBuilder } from "./behaviorBuilder.js";
import { resetMovement } from "../utility/stopMovement.js";
import { syncBall } from "../utility/syncball.js";
export default function runTimeloop(entities) {
  console.log("Called RT");
  const { playing, training } = useRunTimeStore.getState();
  const { updateEntityStat, updateEntity } = useSceneStore.getState();
  const { currentExperimentId, isModelReady, seq, setSeq } =
    useRunTimeStore.getState();

  if (!playing || training) return;

  // const incoming = flushActions();
  // incoming.forEach((action, agentId) => {
  //   const entity = entities[agentId];
  //   if (entity) {
  //     applyAction(action, entity, []);
  //   }
  // });

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

    const observation_vector = buildObsSpace(entity);
    const { behaviorOBSvector, behaviorOBSspace } = BehaviorBuilder(
      observation_vector,
      entity,
    );
    console.log("OBS VECTOR (BEHVAIOR): " + behaviorOBSvector);
    const action_space = entity.action_space;
    const sequence = seq[entity.id] ?? 0; //Read sequence number from store
    const newSeq = sequence + 1; //increment it
    const action = ControllerRouter(
      newSeq,
      behaviorOBSspace,
      behaviorOBSvector,
      entity.id,
      action_space,
      currentExperimentId,
      null,
      "playing",
      isModelReady,
    );

    if (action !== null) {
      console.log("Action Gotten: ", action);
      applyAction(action, entity, behaviorOBSvector);
      setSeq(entity.id, newSeq); //set it back in store
      updateEntityStat(entity.id, {
        seq: newSeq,
        last_action: action,
        observation_vector: observation_vector,
        probabilities: [
          { action: "move_up", prob: 0.4231 },
          { action: "move_left", prob: 0.123 },
          { action: "idle", prob: 0.2103 },
          { action: "collect", prob: 0.1843 },
          { action: "deposit", prob: 0.0 },
          { action: "drop", prob: 0.0 },
        ],
      });
    } else {
      console.log("No Action");
      resetMovement(entity.id);
      updateEntity(entity.id, {
        last_action: "idle",
      });
      updateEntityStat(entity.id, {
        last_action: "idle",
      });
    }
    syncBall();
  });
}
