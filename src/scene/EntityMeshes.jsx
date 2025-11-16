// Visual meshes (R3F), synced with Entity Records
import { useGLTF, Clone } from "@react-three/drei";

function EntityRenderer({ entity }) {
    const model = useGLTF(`/models/${entity.assetRef}`);

    return (
        <group position={entity.position}>
            <Clone object={model.scene} />
        </group>
    );
}

export default function EntityMeshes({ entities }) {
    return (
        <>
            {Object.values(entities).map((entity) => (
                <EntityRenderer key={entity.id} entity={entity} />
            ))}
        </>
    );
}