import { useSceneStore } from "../../../stores/useSceneStore";
import distance3D from "../../utility/3dDistance";

export default function moveAdapter(action, position, rotation, agentId) {
    const { bodies, entities } = useSceneStore.getState();
    const speed = entities[agentId]?.settings?.speed ?? 1;
    const body = bodies[agentId];

    if (!body) {
        console.log("Body not there!", {
            agentId,
            bodyKeys: Object.keys(bodies ?? {}),
            entityExists: !!entities?.[agentId],
            entityName: entities?.[agentId]?.name,
        });
        return {
            updatedPosition: position,
            updatedRotation: rotation,
            targetReached: false,
        };
    }

    const turnSpeed = 0.05;
    let [rx, ry, rz] = rotation;

    let vx = 0;
    let vz = 0;

    switch (action) {
        case "move_up":
            vx = Math.sin(ry) * speed;
            vz = Math.cos(ry) * speed;
            break;

        case "move_down":
            vx = -Math.sin(ry) * speed;
            vz = -Math.cos(ry) * speed;
            break;

        case "move_left":
            ry += turnSpeed;
            vx = Math.sin(ry) * speed;
            vz = Math.cos(ry) * speed;
            break;

        case "move_right":
            ry -= turnSpeed;
            vx = Math.sin(ry) * speed;
            vz = Math.cos(ry) * speed;
            break;
    }

    const currentVel = body.linvel();
    body.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);

    const t = body.translation();
    const updatedPosition = [t.x, t.y, t.z];
    const updatedRotation = [rx, ry, rz];

    const targetReached = targetReachedFrom(updatedPosition, entities);

    return { updatedPosition, updatedRotation, targetReached };
}

function targetReachedFrom(agentPos, entities) {
    let best = Infinity;
    let targetRadius = 1; //Engine Defined - Not User

    for (const e of Object.values(entities)) {
        if (!e?.isTarget) continue;
        const pos = e.position ?? [0, 0, 0];
        const d = distance3D(agentPos, pos);
        if (d < best) {
            best = d;
            targetRadius = e.radius ?? e.settings?.radius ?? 1;
        }
    }

    if (!Number.isFinite(best)) return false;
    return best <= targetRadius;
}