import { useSceneStore } from "../../../stores/useSceneStore";
import distance3D from "../../utility/3dDistance";
import { getForwardVectorFromYaw } from "../../utility/rotationCal";
import { getIndexOfObs } from "../../utility/getIndex";

function getYawFromRapierBody(body) {
  const q = body.rotation();
  return 2 * Math.atan2(q.y, q.w);
}

export default function footballAdapter(action, agentData, actionSpace) {
  const { updateEntity, entities, updateEntityStat, bodies } =
    useSceneStore.getState();

  const agentBody = bodies[agentData.id];
  const agent = entities[agentData.id];

  const indexOfAction = getIndexOfObs(actionSpace, action);
  const capabilities = agent.capabilities;
  let newStateSpace = { ...agent.state_space };

  if (capabilities.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;
    if (agent.last_action === action) {
      newStateSpace.last_action_counter += 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  if (action !== "kick") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    return;
  }

  if (!agentBody || !agent) return;

  const ballId = Object.keys(entities).find(
    (id) => entities[id].tag === "ball",
  );

  const ballBody = bodies[ballId];

  if (!ballBody) return;

  const agentT = agentBody.translation();
  const ballT = ballBody.translation();

  const agentPos = [agentT.x, agentT.y, agentT.z];
  const ballPos = [ballT.x, ballT.y, ballT.z];

  const dist = distance3D(agentPos, ballPos);
  const kickRadius = agent.settings?.kickRadius ?? 1.2;
  const kickStrength = agent.settings?.kickStrength ?? 15.0;

  if (dist > kickRadius) {
    newStateSpace.lastKickSuccess = false;
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    return;
  }

  const yaw = getYawFromRapierBody(agentBody);
  const { x: Rx, z: Rz } = getForwardVectorFromYaw(yaw);

  const currentVel = ballBody.linvel();

  ballBody.setLinvel(
    {
      x: Rx * kickStrength,
      y: currentVel.y,
      z: Rz * kickStrength,
    },
    true,
  );

  newStateSpace.lastKickSuccess = true;

  updateEntity(agent.id, {
    last_action: action,
    state_space: newStateSpace,
  });

  updateEntityStat(agent.id, {
    last_action: action,
    state_space: newStateSpace,
  });

  updateEntity(ballId, {
    state: {
      ...(entities[ballId].state ?? {}),
      lastTouchedBy: agent.id,
      lastTouchedTeam: agent.teamId,
    },
  });
}
