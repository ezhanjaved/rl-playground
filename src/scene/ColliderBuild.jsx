import { RigidBody, CapsuleCollider, CuboidCollider } from "@react-three/rapier"
export default function ColliderBuilder({entity, children}) {
    if (!entity.collider) return;
    const {h, r} = entity.collider;
    const halfHeight = (h/2) - r;
    return (
        <>
        <RigidBody position={entity.position} type={entity.isDecor ? "fixed" : "kinematicVelocity"} colliders={false}>
            <group position={[0,0,0]}>
                {children}
            </group>
            <CapsuleCollider args={[halfHeight, r]} position={[0, halfHeight + r, 0]} />
        </RigidBody>
        </>
    );   
}