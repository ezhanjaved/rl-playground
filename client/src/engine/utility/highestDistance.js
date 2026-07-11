import { useSceneStore } from "../../stores/useSceneStore";
import distance3D from "./3dDistance";

export function highestDistance() {
  const { entities, setHighestDistance } = useSceneStore.getState();
  const entitiesArray = Object.keys(entities);
  let agentIds = [];
  let highestDist = -Infinity;

  entitiesArray.forEach((id) => {
    let ent = entities[id];
    if (ent.tag == "agent") {
      agentIds.push(id);
    }
  });

  agentIds.forEach((agentId) => {
    const agentPos = entities[agentId].position;

    let maxBallDist = -Infinity;
    let maxOtherDist = -Infinity;
    let hasBall = false;

    entitiesArray.forEach((id) => {
      if (entities[id].tag === "agent") return;

      const dist = distance3D(agentPos, entities[id].position);

      if (entities[id].tag === "ball") {
        hasBall = true;
        maxBallDist = Math.max(maxBallDist, dist);
      } else {
        maxOtherDist = Math.max(maxOtherDist, dist);
      }
    });
    highestDist = hasBall ? maxBallDist : maxOtherDist;
  });
  setHighestDistance(highestDist);
}
