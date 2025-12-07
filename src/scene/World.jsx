// Adds Entities from store to the scene
import { useSceneStore } from "../stores/useSceneStore";
import EntityMeshes from './EntityMeshes.jsx';
import ColliderBuilder from "./ColliderBuild.jsx";
import ColliderDebug from "./CollidersDebug.jsx";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function World() {
    const entities = useSceneStore((state) => state.entities); //entities json {1: agebt ,1}
    return (
        <>
            <Physics gravity={[0, -9.81, 0]}>

                <RigidBody type="fixed" colliders={false}>
                    <CuboidCollider args={[500, 0.1, 500]} position={[0, -0.1, 0]} />
                </RigidBody> //Ground

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