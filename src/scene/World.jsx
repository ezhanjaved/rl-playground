// Adds Entities from store to the scene
import { useSceneStore } from "../stores/useSceneStore";
import EntityMeshes from './EntityMeshes.jsx';
import ColliderBuilder from "./ColliderBuild.jsx";
import ColliderDebug from "./CollidersDebug.jsx";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function World() {
    const entities = useSceneStore((state) => state.entities);
    return (
        <>
            <Physics gravity={[0, -9.81, 0]}>

                <RigidBody type="fixed" colliders={false}>
                    <CuboidCollider args={[20, 0.1, 20]} position={[0, -0.1, 0]} />
                </RigidBody>

                {/* <mesh position={[0, -0.1, 0]}>
                    <boxGeometry args={[20, 0.2, 20]} />
                    <meshBasicMaterial color={"#121"}  />
                </mesh> */}

                {Object.values(entities).map(entity => (
                    <ColliderBuilder key={entity.id} entity={entity}>
                        <EntityMeshes entity={entity} />
                        <ColliderDebug entity={entity} />
                    </ColliderBuilder>
                ))}

            </Physics>
        </>
    )
}