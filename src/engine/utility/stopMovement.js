import { useSceneStore } from "../../stores/useSceneStore";
export function stopAllAgents() {
  const { bodies, entities } = useSceneStore.getState();

  Object.entries(entities).forEach(([id, entity]) => {
    if (!["agent", "ball", "push-obj"].includes(entity.tag)) return;

    const body = bodies[id];
    if (!body) return;

    const currentVel = body.linvel();
    console.log("Stopping Movement for Entity: " + entity.tag);
    body.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  });
}
