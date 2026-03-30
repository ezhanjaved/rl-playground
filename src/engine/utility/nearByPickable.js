import distance3D from "./3dDistance";
export function nearbyPickable(entities, position, pickRadius, capabilities) {
  let agentIsHolder = false;

  if (capabilities.includes("Holder")) {
    agentIsHolder = true;
    console.log("Agent is Holder!");
  }

  return (
    Object.values(entities).find((e) => {
      if (!e.isPickable) return false; //Ingore unpickable items!

      if (!agentIsHolder) {
        //If agent is not holder - it would be collector and collector cannot collect items that are not marked for collection
        console.log("Agent is Collector!");
        if (!e.isCollectable || e.isCollectable === "false") {
          console.log("Item was not collectable!");
          return false;
        }
      }
      const dist = distance3D(position, e.position);
      return dist <= pickRadius;
    }) || null
  );
}
