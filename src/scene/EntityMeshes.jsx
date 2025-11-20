// Visual meshes (R3F), synced with Entity Records
import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useSceneStore } from "../stores/useSceneStore";
import { orbitControlsRef } from "./EditorCanvas";
import { SkeletonUtils } from "three-stdlib";

function EntityRenderer({ entity }) {

    const gltf = useGLTF(`/models/${entity.assetRef}`);

    console.log("Entities in EntityRenderer:", Object.keys(useSceneStore.getState().entities).length);

    const {clonedScene, size} = useMemo(() => {

        const clone = SkeletonUtils.clone(gltf.scene);

        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        clone.position.sub(center);
        clone.position.y -= (size.y / 2) * -1;

        return {clonedScene: clone, size};

    }, [gltf, entity]);

    const setActiveEntity = useSceneStore(s => s.setActiveEntity);
    const setDragging = useSceneStore(s => s.setDragging);
    const deleteEntity = useSceneStore(s => s.deleteEntity);

    const onPointerDown = (e) => {
        e.stopPropagation();
        setActiveEntity(entity.id);
        setDragging(true);

        if (orbitControlsRef?.current) {
            orbitControlsRef.current.enabled = false;
        }
    };

    const removeEntity = (e) => {
        console.log("Removing entity:", entity.id);
        e.stopPropagation();
        if (!e.shiftKey) return;
        deleteEntity(entity.id);
        console.log("Entities:", entity);
    }

    return (
        <group onDoubleClick={(e) => removeEntity(e)} position={entity.position}>
            <primitive object={clonedScene} onPointerDown={onPointerDown} />
            <mesh visible={false} position={[0, 1.3, 0]} onPointerDown={onPointerDown}>
                <boxGeometry args={[size.x, size.y, size.z]} />
                <meshBasicMaterial color="orange" opacity={0.2} transparent />
            </mesh>
        </group>
    );
}

export default function EntityMeshes({ entities }) {
    return (
        <>
            {Object.values(entities).map(entity => (
                <EntityRenderer key={entity.id} entity={entity} />
            ))}
        </>
    );
}