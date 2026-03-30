export function getYaw(rotation) {
  return rotation?.[1] ?? 0;
}

export function getForwardVectorFromYaw(ry) {
  return {
    x: Math.sin(ry),
    z: Math.cos(ry),
  };
}
