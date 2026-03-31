import { getYaw, getForwardVectorFromYaw } from "./rotationCal";
export function obstacleAvoid(agentPos, agentRot, ObstaclePos) {
  const [ax, , az] = agentPos;
  const [ox, , oz] = ObstaclePos;
  const [, ry] = agentRot;

  //relative vectors
  const dx = ox - ax;
  const dz = oz - az;

  //can be changed - engine defined
  const lookahead = 2;
  const agentRad = 0.5;
  const ObsRad = 0.5;

  //provides information for forward facing dir (x+ is right, x- is left, z+ is forward, z- is back)
  const yaw = getYaw(ry);
  const { x: Fx, z: Fz } = getForwardVectorFromYaw(yaw);

  const forwardDistance = dx * Fx + dz * Fz;
  if (forwardDistance <= 0 || forwardDistance > lookahead) {
    console.log("Obstacle is either behind or too faraway");
    return false;
  }

  const lateralDistance = Math.abs(dx * Fz - dz * Fx);
  const corridorWidth = agentRad + ObsRad;
  return lateralDistance <= corridorWidth;
}
