import { useSceneStore } from "../../stores/useSceneStore";
import { getYawFromRapierBody } from "../runtime/actuators/MoveableActuators";
export function syncBall() {
  const { entities, updateEntity, bodies } = useSceneStore.getState();
  const entitiesArray = Object.keys(entities);
  let ball_id = null;
  entitiesArray.forEach((id) => {
    let ent = entities[id];
    if (ent.tag == "ball") {
      ball_id = id;
    }
  });
  if (ball_id === null) return;
  const ball_body = bodies[ball_id];
  const t = ball_body.translation();
  const yaw = getYawFromRapierBody(ball_body);
  updateEntity(ball_id, {
    position: [t.x, t.y, t.z],
    rotation: [0, yaw, 0],
  });
}
