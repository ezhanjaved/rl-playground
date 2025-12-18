import { RigidBody, CapsuleCollider, BallCollider } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";
export default function ColliderBuilder({ entity, children }) {
    if (!entity.collider) return;

    const { h, r } = entity.collider;
    const halfHeight = (h / 2) - r;

    const { isTarget } = entity;
    const radius = isTarget ? entity?.targetVisual?.radius : null

    const bodyRef = useRef(null);

    useEffect(() => {
        if (!bodyRef.current) return;
        const { registerBody, unregisterBody } = useSceneStore.getState();
        registerBody(entity.id, bodyRef.current);
        return () => unregisterBody(entity.id);
    }, [entity.id])

    return (
        <>
            <RigidBody ref={bodyRef} position={entity.position} type={entity.tag === "agent" ? "dynamic" : "fixed"} colliders={false} lockRotations linearDamping={4} angularDamping={4}>
                <group position={[0, 0, 0]}>
                    {children}
                </group>
                <CapsuleCollider args={[halfHeight, r]} position={[0, halfHeight + r, 0]} />
                {isTarget && (
                    <BallCollider
                        args={[radius/2]}
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
                )}

            </RigidBody>
        </>
    );
}