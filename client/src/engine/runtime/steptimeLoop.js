// stepTimeLoop.js
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import { sendObsToCloud } from "../../websocket/ccWebsocket.js";
import { useSceneStore } from "../../stores/useSceneStore.js";
import ControllerRouter from "./controllers/controllerRouter.js";
import applyAction from "./actuators/applyAction.js";
import { BehaviorBuilder } from "./behaviorBuilder.js";
import { resetMovement } from "../utility/stopMovement.js";
import { filterObs } from "../utility/filterArray";

export default function stepTimeLoop(entities) {
  const {
    playing,
    training,
    isModelReady,
    seq,
    setSeq,
    setWaitingForAction,
    setControllerMode,
    waitingForAction,
    currentExperimentId,
  } = useRunTimeStore.getState();
  const { updateEntityStat, updateEntity } = useSceneStore.getState();

  if (!playing || training || !isModelReady) return;
  setControllerMode("Policy (PPO)");
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
    const { behaviorOBSvector, currentBehavior, behaviorOBSspace } =
      BehaviorBuilder(observation_vector, entity);
    const action_space = entity.action_space;
    const sequence = seq[entity.id] ?? 0;
    const nextSeq = sequence + 1;

    if (entity.controller === "manual") {
      const action = ControllerRouter(
        nextSeq,
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
        applyAction(action, entity, behaviorOBSvector);
        setSeq(entity.id, nextSeq); //set it back in store
        updateEntityStat(entity.id, {
          seq: nextSeq,
          last_action: action,
          observation_vector: observation_vector,
        });
      } else {
        resetMovement(entity.id);
        updateEntity(entity.id, {
          last_action: "idle",
        });
        updateEntityStat(entity.id, {
          last_action: "idle",
        });
      }
    } else {
      const wFa = waitingForAction[entity.id];
      if (wFa === true) return;

      setSeq(entity.id, nextSeq);
      setWaitingForAction(entity.id, true);

      const session_token = localStorage.getItem("session_token");
      const jwt_token = localStorage.getItem("jwt_token");
      updateEntityStat(entity.id, {
        seq: nextSeq,
        observation_vector: observation_vector,
      });
      const behaviorOBSvectorFiltered = filterObs(behaviorOBSvector);
      sendObsToCloud(
        nextSeq,
        behaviorOBSvectorFiltered,
        session_token,
        jwt_token,
        entity.id,
        entity.capabilities,
        currentBehavior,
      );
    }
  });
}
