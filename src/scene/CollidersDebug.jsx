import { useCanvasSetting } from "../stores/useCanvasSetting";
import { DoubleSide } from "three";
// Toggleable collider wireframes
export default function ColliderDebug({ entity }) {
  if (!entity?.collider) return null;
  const debugMode = useCanvasSetting((state) => state.debugMode);
  const { h, r } = entity.collider;
  const { isTarget } = entity;
  const radius = isTarget ? entity?.targetVisual?.radius : null
  
  const halfHeight = (h/2) - r;

  return (
    <>
    <mesh visible={debugMode} position={[entity.position[0], entity.position[1] + halfHeight + r, entity.position[2]]}>
      <capsuleGeometry args={[r, halfHeight]} />
      <meshBasicMaterial color={"#000000"} wireframe />
    </mesh>
    {isTarget && radius && (
      <mesh visible={true} rotation={[-Math.PI/2, 0, 0]} position={[entity.position[0], entity.position[1] + 0.01, entity.position[2]]}>
          <ringGeometry args={[radius - 0.05, radius, 64]} />
          <meshBasicMaterial color={"#ff0000"} side={DoubleSide} />
      </mesh>
    )}
    </>
  );
}