import { Quaternion, Euler } from "three";

export function getYaw(rotation) {
  return rotation?.[1] ?? 0;
}

export function getForwardVectorFromYaw(ry) {
  return {
    x: Math.sin(ry),
    z: Math.cos(ry),
  };
}

export function convertRot(rot) {
  const euler = new Euler(rot[0], rot[1], rot[2], "XYZ");
  const q = new Quaternion().setFromEuler(euler);
  return q;
}
