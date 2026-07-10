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

  agentIds.forEach((id) => {
    const agentId = id;
    const agentPos = entities[agentId].position;
    entitiesArray.forEach((val) => {
      if (entities[val].tag != "agent") {
        const objPos = entities[val].position;
        const dist = distance3D(agentPos, objPos);
        if (dist > highestDist) {
          highestDist = dist;
        }
      }
    });
  });
  setHighestDistance(highestDist);
}
