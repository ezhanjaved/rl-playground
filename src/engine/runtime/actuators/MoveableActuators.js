import { useSceneStore } from "../../../stores/useSceneStore";
import { getForwardVectorFromYaw } from "../../utility/rotationCal";
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

  const turnSpeed = 0.1;
  let [rx, ry, rz] = rotation;
  const { x: Rx, z: Rz } = getForwardVectorFromYaw(ry);

  let vx = 0;
  let vz = 0;
  print("Speed: ", speed);
  switch (action) {
    case "move_up":
      vx = Rx * speed;
      vz = Rz * speed;
      break;

    case "move_left":
      ry += turnSpeed;
      break;

    case "move_right":
      ry -= turnSpeed;
      break;

    case "idle":
      vx = 0;
      vz = 0;
      break;
  }

  const currentVel = body.linvel();
  if (action === "move_left" || action === "move_right") {
    body.setLinvel({ x: currentVel.x, y: currentVel.y, z: currentVel.z }, true);
  } else {
    body.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);
  }

  const t = body.translation();
  const updatedPosition = [t.x, t.y, t.z];
  const updatedRotation = [rx, ry, rz];

  return { updatedPosition, updatedRotation };
}
