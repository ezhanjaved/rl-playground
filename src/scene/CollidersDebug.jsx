import { useCanvasSetting } from "../stores/useCanvasSetting";
import { DoubleSide } from "three";
// Toggleable collider wireframes
export default function ColliderDebug({ entity }) {
  if (!entity?.collider) return null;
  const debugMode = useCanvasSetting((state) => state.debugMode);
  const { shape, h, r, w, d } = entity.collider;
  const { isTarget } = entity;
  const radius = isTarget ? entity?.targetVisual?.radius : null;

  const halfHeight = (h / 2) - (r ?? 0);

  return (
    <>
      {shape === "box" ? (
        <mesh visible={debugMode} position={[0, h / 2, 0]}>
          <boxGeometry args={[w, h, d]} />
          <meshBasicMaterial color={"#000000"} wireframe />
        </mesh>
      ) : (
        <mesh visible={debugMode} position={[0, halfHeight + r, 0]}>
          <capsuleGeometry args={[r, halfHeight]} />
          <meshBasicMaterial color={"#000000"} wireframe />
        </mesh>
      )}
      {isTarget && radius && (
        <mesh visible={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[radius - 0.05, radius, 64]} />
          <meshBasicMaterial color={"#ff0000"} side={DoubleSide} />
        </mesh>
      )}
    </>
  );
}