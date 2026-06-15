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

  const goalId = entity.goalId;
  const { shape, h, r, w, d } = entity.collider;
  const isGoalPost = entity?.isGoalPost || false;
  const halfHeight = h / 2 - (r ?? 0);

  const renderCollider = () => {
    if (shape === "box") {
      if (isGoalPost) {
        return (
          <CuboidCollider
            name={`goal_sensor_${goalId}`}
            args={[w / 2, h / 2, d / 2]}
            position={[0, h / 2, 0]}
            sensor
            onIntersectionEnter={(event) => {
              const rigidBodyName = event.other.rigidBodyObject?.name;
              const colliderName = event.other.colliderObject?.name;
              const postName = event.target.colliderObject?.name;

              const isBall =
                rigidBodyName === "ball" || colliderName === "ball_collider";

              if (!isBall) {
                console.log(
                  "Ignored non-ball object:",
                  rigidBodyName,
                  colliderName,
                );
                return;
              }

              console.log("Post: " + postName);
              console.log("GOAL!");
            }}
            onIntersectionExit={(event) => {
              console.log("Something left goal sensor", event);
            }}
          />
        );
      } else {
        return (
          <CuboidCollider
            args={[w / 2, h / 2, d / 2]}
            position={[0, h / 2, 0]}
          />
        );
      }
    }

    if (shape === "ball") {
      return (
        <BallCollider
          args={[r]}
          position={[0, r, 0]}
          friction={0.5}
          name="ball_collider"
          restitution={0.3}
        />
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
        type={
          entity.tag === "agent" ||
          entity.tag === "ball" ||
          entity.tag === "push-obj"
            ? "dynamic"
            : "fixed"
        }
        colliders={false}
        enabledRotations={
          entity.tag === "agent"
            ? [false, true, false]
            : entity.tag === "ball"
              ? [true, true, true]
              : [true, true, false]
        }
        linearDamping={entity.tag === "agent" ? 0.0 : 0.5}
        angularDamping={entity.tag === "agent" ? 0.0 : 0.5}
      >
        <group position={[0, 0, 0]}>{children}</group>
        {renderCollider()}
      </RigidBody>
    </>
  );
}
