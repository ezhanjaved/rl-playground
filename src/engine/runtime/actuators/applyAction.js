import { CapabilityMatcher } from "../../capabilities/capabilitiesMatcher.js";
import previousDistanceCorrection from "../../utility/previousDistance.js";
import moveAdapter from "./MoveableActuators.js";
import holderAdapter from "./HolderActuators.js";
import collectorAdapter from "./CollectorActuators.js";
import finderAdapter from "./finderActuators.js";
import depositAdapter from "./DepositActuators.js";

export default function applyAction(action_picked, agent, observation_space) {
  const capabilityMatched = CapabilityMatcher(action_picked);
  const actionSpace = agent.action_space;
  switch (capabilityMatched) {
    case "Moveable":
      moveableWorker(action_picked, agent, observation_space);
      break;
    case "Holder":
      holderWorker(action_picked, agent, actionSpace);
      break;
    case "Collector":
      collectorWorker(action_picked, agent, actionSpace);
      break;
    case "Finder":
      finderWorker(action_picked, agent, actionSpace);
      break;
    case "Depositor":
      depositWorker(action_picked, agent, actionSpace);
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

function holderWorker(action, entity, actionSpace) {
  holderAdapter(action, entity, actionSpace); //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered
}

function collectorWorker(action, entity, actionSpace) {
  collectorAdapter(action, entity, actionSpace); //This Adapter would TRY adding picking obj by hand (by adding obj as  a child to hand bone) on pick action - however this action will only suceed if pickable obj would be in nearby - if obj would be nearby it will update state_space of agent holding to true otherwise it would remain false - regardless pick animation would be rendered
}

function depositWorker(action, entity, actionSpace) {
  depositAdapter(action, entity, actionSpace);
}

function finderWorker(action, entity, actionSpace) {
  finderAdapter(action, entity, actionSpace);
}
