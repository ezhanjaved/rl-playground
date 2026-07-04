import {
  RigidBody,
  CapsuleCollider,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";
import { footballRef } from "../engine/utility/footballRef";
import { footballBallTouchRef } from "../engine/utility/footballTouchRef";
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
  const isGoalPost = entity?.isGoalPostRed || entity?.isGoalPostBlue;
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
              footballRef(event);
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
          onCollisionEnter={footballBallTouchRef}
        />
      );
    }

    return (
      <CapsuleCollider
        name={`${entity.id}_collider`}
        args={[halfHeight, r]}
        position={[0, halfHeight + r, 0]}
      />
    );
  };

  return (
    <>
      <RigidBody
        name={entity.id}
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
              : [false, false, false]
        }
        linearDamping={entity.tag === "agent" ? 0.2 : 0.8}
        angularDamping={entity.tag === "agent" ? 0.2 : 0.8}
      >
        <group position={[0, 0, 0]}>{children}</group>
        {renderCollider()}
      </RigidBody>
    </>
  );
}
