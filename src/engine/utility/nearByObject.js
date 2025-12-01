export function nearbyObject(entities, position, pickRadius, capabilities) {
    let agentIsHolder = false;
    
    if (capabilities.includes("Holder")) {
        agentIsHolder = true;
        console.log("Agent is Holder!");
    }

    const [ax, ay, az] = position;

    return Object.values(entities).find((e) => {
        if (!e.isPickable) return false; //Ingore unpickable items!
        
        if (!agentIsHolder) { //If agent is not holder - it would be collector and collector cannot collect items that are not marked for collection
            console.log("Agent is Collector!");
            if (!e.isCollectable || e.isCollectable === "false") {
                console.log("Item was not collectable!");
                return false;
            }
        }

        const [x, y, z] = e.position;
        const dx = x - ax;
        const dy = y - ay;
        const dz = z - az;
        return dx*dx + dy*dy + dz*dz <= pickRadius * pickRadius;
    }) || null;
}