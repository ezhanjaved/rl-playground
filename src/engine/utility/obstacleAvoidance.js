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
  console.log("dx: " + dx + " dz: " + dz);
  const { x: Fx, z: Fz } = getForwardVectorFromYaw(ry);
  console.log("ry:", ry, "Fx:", Fx.toFixed(3), "Fz:", Fz.toFixed(3));

  const forwardDistance = dx * Fx + dz * Fz;
  console.log("Forward Dist: " + forwardDistance);
  if (forwardDistance <= 0 || forwardDistance > lookahead) {
    return false;
  }

  const lateralDistance = Math.abs(dx * Fz - dz * Fx);
  console.log("Lateral Dist: " + lateralDistance);
  const corridorWidth = agentRad + ObsRad;
  return lateralDistance <= corridorWidth;
}
