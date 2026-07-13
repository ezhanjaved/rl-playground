import { useSceneStore } from "../../../stores/useSceneStore";
import { getForwardVectorFromYaw } from "../../utility/rotationCal";

export function getYawFromRapierBody(body) {
  const q = body.rotation();
  return 2 * Math.atan2(q.y, q.w);
}

export default function moveAdapter(action, position, rotation, agentId) {
  const { bodies, entities } = useSceneStore.getState();

  const speed = entities[agentId]?.settings?.speed ?? 2.0;
  const body = bodies[agentId];

  if (!body) {
    console.log("Body is not there!", {
      agentId,
      bodyKeys: Object.keys(bodies ?? {}),
      entityExists: !!entities?.[agentId],
      entityName: entities?.[agentId]?.name,
    });

    return {
      updatedPosition: position,
      updatedRotation: rotation,
    };
  }

  const turnSpeed = 0.1 * 60.0;

  const yaw = getYawFromRapierBody(body);
  const { x: Rx, z: Rz } = getForwardVectorFromYaw(yaw);
  let vx = 0.0;
  let vz = 0.0;
  let wy = 0.0;

  switch (action) {
    case "move_up":
      vx = Rx * Number(speed);
      vz = Rz * Number(speed);
      break;

    case "move_left":
      wy = turnSpeed;
      break;

    case "move_right":
      wy = -turnSpeed;
      break;

    case "idle":
    default:
      break;
  }

  const currentVel = body.linvel();

  body.setLinvel(
    {
      x: vx,
      y: currentVel.y,
      z: vz,
    },
    true,
  );

  body.setAngvel(
    {
      x: 0.0,
      y: wy,
      z: 0.0,
    },
    true,
  );

  const t = body.translation();
  return {
    updatedPosition: [t.x, t.y, t.z],
    updatedRotation: [0, yaw, 0],
  };
}
