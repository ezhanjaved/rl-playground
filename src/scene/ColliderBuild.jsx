import {
  RigidBody,
  CapsuleCollider,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";
export default function ColliderBuilder({ entity, children }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    const { registerBody, unregisterBody } = useSceneStore.getState();
    registerBody(entity.id, bodyRef.current);
    console.log("Body Registered: " + bodyRef.current);
    return () => unregisterBody(entity.id);
  }, [entity.id]);

  if (!entity.collider) return;

  const { shape, h, r, w, d } = entity.collider;
  const halfHeight = h / 2 - (r ?? 0);

  const { isTarget } = entity;
  const radius = isTarget ? entity?.targetVisual?.radius : null;

  const renderCollider = () => {
    if (shape === "box") {
      return (
        <CuboidCollider args={[w / 2, h / 2, d / 2]} position={[0, h / 2, 0]} />
      );
    }
    return (
      <CapsuleCollider
        args={[halfHeight, r]}
        position={[0, halfHeight + r, 0]}
      />
    );
  };

  return (
    <>
      <RigidBody
        ref={bodyRef}
        position={entity.position}
        rotation={entity.rotation ?? [0, 0, 0]}
        type={entity.tag === "agent" ? "dynamic" : "fixed"}
        colliders={false}
        lockRotations
        linearDamping={4}
        angularDamping={4}
      >
        <group position={[0, 0, 0]}>{children}</group>
        {renderCollider()}
        {/* {isTarget && (
                    <BallCollider
                        args={[radius / 2]}
                        position={[0, 0.01, 0]}
                        sensor
                        name="targetSensor"
                        onIntersectionEnter={({ other }) => {
                            console.log("ENTER sensor");
                            console.log("object", other);
                        }}
                        onIntersectionExit={({ other }) => {
                            console.log("EXIT sensor");
                        }}
                    />
                )}*/}
      </RigidBody>
    </>
  );
}
