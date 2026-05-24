// stepTimeLoop.js
import { useRunTimeStore } from "../../stores/useRunTimeStore.js";
import buildObsSpace from "./observationBuilder.js";
import { sendObsToCloud } from "../../websocket/ccWebsocket.js";

export default function stepTimeLoop(entities) {
  const {
    playing,
    training,
    isModelReady,
    seq,
    setSeq,
    setWaitingForAction,
    waitingForAction,
  } = useRunTimeStore.getState();

  if (!playing || training || !isModelReady) return;

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
    if (!wFa) return;

    const sequence = seq[entity.id];
    const nextSeq = sequence + 1;

    setSeq(entity.id, nextSeq);
    setWaitingForAction(entity.id, true);

    const session_token = localStorage.getItem("session_token");
    const jwt_token = localStorage.getItem("jwt_token");

    console.log("Lockstep OBS:", nextSeq, observation_space);

    sendObsToCloud(
      nextSeq,
      observation_space,
      session_token,
      jwt_token,
      entity.id,
      entity.action_space,
    );
  });
}
