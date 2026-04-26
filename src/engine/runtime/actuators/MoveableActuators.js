import { useSceneStore } from "../../../stores/useSceneStore";
import { getYaw, getForwardVectorFromYaw } from "../../utility/rotationCal";
export default function moveAdapter(action, position, rotation, agentId) {
  const { bodies, entities } = useSceneStore.getState();
  const speed = entities[agentId]?.settings?.speed ?? 1;
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

  const turnSpeed = 0.05;
  let [rx, ry, rz] = rotation;
  const yaw = getYaw(rotation);
  const { x: Rx, z: Rz } = getForwardVectorFromYaw(yaw);

  let vx = 0;
  let vz = 0;

  switch (action) {
    case "move_up":
      vx = Rx * speed;
      vz = Rz * speed;
      break;

    case "move_down":
      vx = -Rx * speed;
      vz = -Rz * speed;
      break;

    case "move_left":
      ry += turnSpeed;
      // vx = Rx * speed;
      // vz = Rz * speed;
      break;

    case "move_right":
      ry -= turnSpeed;
      // vx = Rx * speed;
      // vz = Rz * speed;
      break;
  }

  const currentVel = body.linvel();
  body.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);

  const t = body.translation();
  const updatedPosition = [t.x, t.y, t.z];
  const updatedRotation = [rx, ry, rz];

  return { updatedPosition, updatedRotation };
}
