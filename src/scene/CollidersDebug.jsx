import { useCanvasSetting } from "../stores/useCanvasSetting";
// Toggleable collider wireframes
export default function ColliderDebug({ entity }) {
  if (!entity?.collider) return null;
  const debugMode = useCanvasSetting((state) => state.debugMode); //Instant access
  const { h, r } = entity.collider;

  const halfHeight = (h/2) - r;

  return (
    <mesh visible={debugMode} position={[entity.position[0], entity.position[1] + halfHeight + r, entity.position[2]]}>
      <capsuleGeometry args={[halfHeight, r]} />
      <meshBasicMaterial color={"#000000"} wireframe />
    </mesh>
  );
}