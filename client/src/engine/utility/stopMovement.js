import { useSceneStore } from "../../stores/useSceneStore";
export function stopAllAgents() {
  const { entities } = useSceneStore.getState();
  Object.entries(entities).forEach(([id, entity]) => {
    if (!["agent", "ball", "push-obj"].includes(entity.tag)) return;
    resetMovement(id);
  });
}

export function resetMovement(agentId) {
  const { bodies } = useSceneStore.getState();
  const body = bodies[agentId];
  if (!body) return;

  const currentVel = body.linvel();
  body.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);
  body.setAngvel({ x: 0, y: 0, z: 0 }, true);
}
