// stepTimeLoop.js
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import { sendObsToCloud } from "../../websocket/ccWebsocket.js";
import { useSceneStore } from "../../stores/useSceneStore.js";

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
  } = useRunTimeStore.getState();
  const { updateEntityStat } = useSceneStore.getState();

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
    const observation_space = buildObsSpace(entity);
    const wFa = waitingForAction[entity.id];
    if (wFa === true) return;

    const sequence = seq[entity.id];
    const nextSeq = sequence + 1;

    setSeq(entity.id, nextSeq);
    setWaitingForAction(entity.id, true);

    const session_token = localStorage.getItem("session_token");
    const jwt_token = localStorage.getItem("jwt_token");
    updateEntityStat(entity.id, {
      seq: nextSeq,
      observation_vector: observation_space,
    });
    sendObsToCloud(
      nextSeq,
      observation_space,
      session_token,
      jwt_token,
      entity.id,
      entity.capabilities,
    );
  });
}
