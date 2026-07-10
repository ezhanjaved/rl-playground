import distance3D from "./3dDistance";

export function nearbyPickable(entities, position, pickRadius, capabilities) {
  let agentIsHolder = capabilities.includes("Holder");

  let nearestEntity = null;
  let minDist = Infinity;

  for (const e of Object.values(entities)) {
    if (!e.isPickable) continue;

    // Collectors can only collect collectable items
    if (!agentIsHolder) {
      if (!e.isCollectable || e.isCollectable === "false") {
        continue;
      }
    }

    const dist = distance3D(position, e.position);

    if (dist < minDist) {
      minDist = dist;
      nearestEntity = e;
    }
  }

  return minDist <= pickRadius ? nearestEntity : null;
}
