// Adds Entities from store to the scene
import { useSceneStore } from "../stores/useSceneStore";
import EntityMeshes from './EntityMeshes.jsx';

export default function World() {
    const entities = useSceneStore((state) => state.entities);
    return (
        <>
            <EntityMeshes entities={entities} />
        </>
    )
}