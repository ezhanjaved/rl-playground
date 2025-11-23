// Visual meshes (R3F), synced with Entity Records
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { orbitControlsRef } from "./EditorCanvas";
import { SkeletonUtils } from "three-stdlib";

function EntityRenderer({ entity }) {

    const { playing } = useRunTimeStore.getState();

    const modelLoaded = useGLTF(`/models/${entity.assetRef}`);
    const modelAnimations = entity.animationRef ? useGLTF(`/models/${entity.animationRef}`) : null;

    console.log("Entities in EntityRenderer:", Object.keys(useSceneStore.getState().entities).length);

    const { clonedScene, size } = useMemo(() => {

        const clone = SkeletonUtils.clone(modelLoaded.scene);

        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        clone.position.sub(center);
        clone.position.y -= (size.y / 2) * -1;

        return {clonedScene: clone, size };

    }, [modelLoaded, entity.assetRef]);

    const actions = modelAnimations ? useAnimations(modelAnimations.animations, clonedScene) : null;
    console.log("Loaded animations for entity: ", actions);

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

    useFrame(() => {
        if (playing === false) {
            console.log("Animation paused");
            return;
        }

        if (entity.isDecor || !actions){
            console.log("No animation to play");
            return;
        } 

        const actionPerformed = entity.last_action; //MoveForward, TurnLeft, etc.
        const name = entity.name; //Mage, Lizard, etc.

        console.log(`Animating entity ${name} with action ${actionPerformed}`);
        //We will play the animation based on last_action
        animationLoop(name, actionPerformed, actions);
    })

    function animationLoop(name, last_action, actions) {
        console.log(`Animating ${name} with action ${last_action}`);
        if (actions && actions["actions"]["Walking_B"]) {
            actions["actions"]["Walking_B"].play();
        }
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