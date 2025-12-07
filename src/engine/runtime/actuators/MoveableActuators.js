import { useSceneStore } from "../../../stores/useSceneStore";

export default function moveAdapter(action, position, rotation, agentId) {
    const { bodies } = useSceneStore.getState();
    const { entities } = useSceneStore.getState();
    const speed = entities[agentId]?.settings?.speed || 1;
    const body = bodies[agentId];

    const moveSpeed = speed;  
    const turnSpeed = 0.05;     

    let x, y, z;

    if (body) {
        const t = body.translation();
        x = t.x;
        y = t.y;
        z = t.z;
    } else {
        [x, y, z] = position;
    }

    let [rx, ry, rz] = rotation;

    const dirX = Math.sin(ry);
    const dirZ = Math.cos(ry);

    let vx = 0;
    let vz = 0;

    switch (action) {
        case "move_up":
            vx = dirX * moveSpeed;
            vz = dirZ * moveSpeed;
            break;

        case "move_down":
            vx = -dirX * moveSpeed;
            vz = -dirZ * moveSpeed;
            break;

        case "move_left":
            ry += turnSpeed;       // turn left
            vx = dirX * moveSpeed; 
            vz = dirZ * moveSpeed;
            break;

        case "move_right":
            ry -= turnSpeed;       // turn right
            vx = dirX * moveSpeed;
            vz = dirZ * moveSpeed;
            break;

        case "idle":
        default:
            vx = 0;
            vz = 0;
            break;
    }

    const currentVel = body.linvel();
    body.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);
    const t = body.translation();
    const updatedPosition = [t.x, t.y, t.z];
    const updatedRotation = [rx, ry, rz];
    return { updatedPosition, updatedRotation };
}