import { getForwardVectorFromYaw } from "./rotationCal";
export function obstacleAvoid(agentPos, agentRot, ObstaclePos) {
  const [ax, , az] = agentPos;
  const [ox, , oz] = ObstaclePos;
  const [, ry] = agentRot; // ry is already a scalar in radians

  //relative vectors
  const dx = ox - ax;
  const dz = oz - az;

  //can be changed - engine defined
  const lookahead = 3.0;
  const agentRad = 0.5;
  const ObsRad = 0.8;
  const { x: Fx, z: Fz } = getForwardVectorFromYaw(ry);

  const forwardDistance = dx * Fx + dz * Fz;
  if (forwardDistance <= 0 || forwardDistance > lookahead) {
    return false;
  }

  const lateralDistance = Math.abs(dx * Fz - dz * Fx);
  const corridorWidth = agentRad + ObsRad;
  return lateralDistance <= corridorWidth;
}
