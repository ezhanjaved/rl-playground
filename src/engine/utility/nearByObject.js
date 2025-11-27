export function nearbyObject(entities, position, pickRadius) {
    const [ax, ay, az] = position;
    return Object.values(entities).find((e) => {
        if (!e.isPickable) return false;
        const [x, y, z] = e.position;
        const dx = x - ax;
        const dy = y - ay;
        const dz = z - az;
        return dx*dx + dy*dy + dz*dz <= pickRadius * pickRadius;
    }) || null;
}