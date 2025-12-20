// trainingLoop.js
import { useSceneStore } from "../../stores/useSceneStore";
import { useRunTimeStore } from "../../stores/useRunTimeStore";
import buildObsSpace from "./observationBuilder";
import { envSet } from "./envStep";
import ControllerRouter from "./controllers/controllerRouter";
import { qLearningLearner } from "../runtime/controllers/policyController"
import { addCapabilitySchemas } from "../capabilities/registry";

const tick = () => new Promise((r) => setTimeout(r, 0));

export async function trainingLoop(experimentId) {
  const runtime0 = useRunTimeStore.getState();
  const exp0 = runtime0.experiments?.[experimentId];
  if (!exp0) return;

  if (!useRunTimeStore.getState().training) {
    runtime0.updateExperiementStatus(experimentId, "Paused");
    return;
  }

  if (exp0.status !== "Training") {
    runtime0.updateExperiementStatus(experimentId, "Training");
  }

  const pauseAndExit = async () => {
    useRunTimeStore.getState().updateExperiementStatus(experimentId, "Paused");
    await tick();
  };

  const scene0 = useSceneStore.getState();
  const assignments0 = scene0.assignments || {};
  const entities0 = scene0.entities || {};

  const candidateIds = Object.keys(assignments0);
  const agentIds = candidateIds.filter((id) => {
    const a = assignments0?.[id];
    const e = entities0?.[id];
    return !!(a?.assignedConfig && a?.assignedGraphId && e && Array.isArray(e.action_space));
  });

  const fixedPositions = {};
  for (const agentId of agentIds) {
    fixedPositions[agentId] = structuredClone(exp0?.agents?.[agentId]?.fixedPosition ?? [0, 0, 0]);
  }

  for (const agentId of agentIds) {
    if (!useRunTimeStore.getState().training) {
      await pauseAndExit();
      return;
    }

    const sceneNow = useSceneStore.getState();
    const config = sceneNow.assignments?.[agentId]?.assignedConfig;
    const graphId = sceneNow.assignments?.[agentId]?.assignedGraphId;
    if (!config || !graphId) continue;

    const maxEpisodes = config.episodeNumber ?? 50;
    const maxSteps = config.maxStepsPerEpisode ?? 200;

    const expNow = useRunTimeStore.getState().experiments?.[experimentId];
    let qTable = structuredClone(expNow?.agents?.[agentId]?.learningState?.qTable ?? {});

    for (let ep = 0; ep < maxEpisodes; ep++) {
      if (!useRunTimeStore.getState().training) {
        await pauseAndExit();
        return;
      }

      const resetOk = resetAgentForEpisode(agentId, fixedPositions[agentId]);
      if (!resetOk) {
        await pauseAndExit();
        return;
      }

      let rewardSum = 0;
      let stepTaken = 0;
      let done = false;

      for (let step = 0; step < maxSteps; step++) {
        if (!useRunTimeStore.getState().training) {
          await pauseAndExit();
          return;
        }

        const sceneStep = useSceneStore.getState();
        const agent = sceneStep.entities?.[agentId];

        if (!agent || !Array.isArray(agent.action_space)) {
          await pauseAndExit();
          return;
        }

        const obsVector = buildObsSpace(agent);
        console.log("OBS Vector: " + obsVector);
        const actionSpace = agent.action_space;
        
        const actionPicked = ControllerRouter(obsVector, agentId, actionSpace, experimentId);
        console.log("Action Picked: " + actionPicked);
        
        const { reward, done: stepDone, nextObs } = envSet(actionPicked, agent, obsVector);

        qTable = qLearningLearner(qTable, actionPicked, obsVector, nextObs, reward, stepDone, config);

        rewardSum += reward;
        stepTaken += 1;
        done = stepDone;

        if (done) break;
        if (step % 50 === 0) await tick();
      }

      const episodeInfo = { episodeIndex: ep, stepTaken, rewardSum, done };

      useRunTimeStore
        .getState()
        .syncEpisodeResult(experimentId, agentId, qTable, ep, episodeInfo, rewardSum);

      await tick();
    }
  }

  if (useRunTimeStore.getState().training) {
    useRunTimeStore.getState().updateExperiementStatus(experimentId, "Completed");
  } else {
    await pauseAndExit();
  }
}

function resetAgentForEpisode(agentId, fixedPosition) {
  const scene = useSceneStore.getState();
  const agent = scene.entities?.[agentId];
  if (!agent) return false;

  const body = scene.bodies?.[agentId];
  const config = scene.assignments?.[agentId]?.assignedConfig;

  const spawnMode = config?.agentSpawnMode ?? "Random";
  const TWO_PI = 2 * Math.PI;

  let updatedPosition = [0, 0, 0];
  let updatedRotation = [0, 0, 0];

  if (spawnMode === "Fixed") {
    updatedPosition = structuredClone(fixedPosition ?? [0, 0, 0]);
    updatedRotation = [0, 0, 0];
  } else {
    updatedPosition = randomPosition(-10, 10);
    updatedRotation = randomRotation(0, TWO_PI);
  }

  if (body) {
    body.setTranslation(
      { x: updatedPosition[0], y: updatedPosition[1], z: updatedPosition[2] },
      true
    );
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }

  let stateSpace = {};
  try {
    const capability = agent?.capabilities;
    const res = addCapabilitySchemas(capability);
    stateSpace = res?.stateSpace ?? {};
  } catch {
    stateSpace = {};
  }

  useSceneStore.getState().updateEntity(agentId, {
    position: updatedPosition,
    rotation: updatedRotation,
    state_space: stateSpace,
    last_action: null,
  });

  return true;
}

function floatRandom(min, max, decimals = 4) {
  const v = Math.random() * (max - min) + min;
  return Number(v.toFixed(decimals));
}

function randomPosition(min, max) {
  const x = floatRandom(min, max);
  const z = floatRandom(min, max);
  return [x, 0, z];
}

function randomRotation(min, max) {
  const yaw = floatRandom(min, max);
  return [0, yaw, 0];
}