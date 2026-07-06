import distance3D from "./3dDistance";
export default function getNearestTargetInfo(agentPos, entities, type) {
  //type can allow us to use this function for diff obj types
  let best = Infinity;
  let targetRadius = 2.0;
  let entityId = null;
  let entityName = null;

  for (const e of Object.values(entities)) {
    if (!e?.[type]) continue;
    const pos = e.position ?? [0, 0, 0];
    const distance = distance3D(agentPos, pos);
    if (distance < best) {
      entityId = e.id;
      entityName = e.name;
      best = distance;
      targetRadius = e.radius ?? e.settings?.radius ?? 2.0;
    }
  }

  if (!Number.isFinite(best)) {
    return {
      found: false,
      distance: Infinity,
      radius: targetRadius,
      entityId: null,
      entityName: null,
    };
  }
  return {
    found: true,
    distance: best,
    radius: targetRadius,
    entityId,
    entityName,
  };
}
