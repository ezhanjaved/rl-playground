import { useSceneStore } from "../../../stores/useSceneStore";
import distance3D from "../../utility/3dDistance";

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

    const targetReached = targetReachedFrom(updatedPosition, entities);
    if (targetReached) {
        console.log("Agent Reached Target!");
    }
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