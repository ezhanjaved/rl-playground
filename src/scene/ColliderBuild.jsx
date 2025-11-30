import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";
export default function ColliderBuilder({entity, children}) {
    if (!entity.collider) return;

    const {h, r} = entity.collider;
    const halfHeight = (h/2) - r;

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
            <group position={[0,0,0]}>
                {children}
            </group>
            <CapsuleCollider args={[halfHeight, r]} position={[0, halfHeight + r, 0]} />
        </RigidBody>
        </>
    );   
}