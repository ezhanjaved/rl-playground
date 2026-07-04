import { useSceneStore } from "../../stores/useSceneStore";

export function footballBallTouchRef(event) {
  const { entities, updateEntity } = useSceneStore.getState();

  const targetRigidName = event.target.rigidBodyObject?.name;
  const targetColliderName = event.target.colliderObject?.name;

  const otherRigidName = event.other.rigidBodyObject?.name;
  const otherColliderName = event.other.colliderObject?.name;

  const ballId = findBallId(entities);

  if (!ballId) return;

  const touchedBall =
    targetRigidName === "ball" ||
    targetColliderName === "ball_collider" ||
    otherRigidName === "ball" ||
    otherColliderName === "ball_collider";

  if (!touchedBall) return;

  const possibleAgentId =
    targetRigidName === "ball" || targetColliderName === "ball_collider"
      ? otherRigidName
      : targetRigidName;

  const agent = entities[possibleAgentId];

  if (!agent || agent.tag !== "agent") return;

  const currentBallState = entities[ballId]?.state ?? {};

  updateEntity(ballId, {
    state: {
      ...currentBallState,
      lastTouchedBy: possibleAgentId,
      lastTouchedTeam: agent.teamId,
    },
  });

  console.log("Ball touched by:", possibleAgentId, agent.teamId);
}

function findBallId(entities) {
  return Object.entries(entities).find(([id, ent]) => ent.tag === "ball")?.[0];
}
