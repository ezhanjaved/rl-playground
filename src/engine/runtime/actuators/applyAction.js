import { CapabilityMatcher } from "../../capabilities/capabilitiesMatcher.js";
import { useSceneStore } from "../../../stores/useSceneStore.js";
import previousDistanceCorrection from "../../utility/previousDistance.js";
import moveAdapter from "./MoveableActuators.js";
import holderAdapter from "./HolderActuators.js";
import collectorAdapter from "./CollectorActuators.js";
import finderAdapter from "./finderActuators.js";

export default function applyAction(action_picked, agent, observation_space) {
  const capabilityMatched = CapabilityMatcher(action_picked); //Map action to the capability

  switch (capabilityMatched) {
    case "Moveable":
      moveableWorker(action_picked, agent, observation_space);
      break;
    case "Holder":
      holderWorker(action_picked, agent);
      break;
    case "Collector":
      collectorWorker(action_picked, agent);
      break;
    case "Finder":
      finderWorker(action_picked, agent, observation_space);
      break;
    default:
      break;
  }
}

function moveableWorker(action, entity, observation_space) {
  const { updatedPosition, updatedRotation } = moveAdapter(
    action,
    entity.position,
    entity.rotation,
    entity.id,
  );
  previousDistanceCorrection(
    observation_space,
    entity,
    action,
    updatedPosition,
    updatedRotation,
  );
}

function holderWorker(action, entity) {
  holderAdapter(action, entity); //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered
}

function collectorWorker(action, entity) {
  collectorAdapter(action, entity); //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered
}

function finderWorker(action, entity, observation_space) {
  const { updateEntity, entities } = useSceneStore.getState();
  const { targetReached, previousDistance } = finderAdapter(
    action,
    entity,
    observation_space,
  );
  const freshAgent = entities[entity.id];
  updateEntity(entity.id, {
    state_space: {
      ...freshAgent.state_space,
      targetReached: targetReached,
      previous_distance_target: previousDistance,
    },
  });
}
