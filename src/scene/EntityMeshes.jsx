// Visual meshes (R3F), synced with Entity Records
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { orbitControlsRef } from "./EditorCanvas";
import { SkeletonUtils } from "three-stdlib";
import animationsMapper from "../engine/capabilities/animationFinder";

function EntityRenderer({ entity }) {

    const { playing } = useRunTimeStore.getState();

    const fetchEntityData = useSceneStore(s => s.fetchEntityData);

    const heldItemId = entity.state_space?.heldItemId || null;
    console.log("Held Item ID: " + heldItemId);
    const heldItemAsset = heldItemId ? fetchEntityData(heldItemId) : null;
    console.log("Held Item Asset: " + heldItemAsset);
    const heldItemGLTF = heldItemAsset ? useGLTF(`/models/agents/skelton/Skeleton_Blade.gltf`) : null;

    const modelLoaded = useGLTF(`/models/${entity.assetRef}`);

    const handRef = useRef(null);

    const animationRefs = useMemo(() => {
        if (!entity.animationRef) return [];
        return typeof entity.animationRef === "object"
            ? Object.values(entity.animationRef)
            : [entity.animationRef];
    }, [entity.animationRef]);

    const animationGLTFs = animationRefs.map(ref => useGLTF(`/models/${ref}`));

    const allAnimations = useMemo(
        () => animationGLTFs.flatMap(g => g.animations || []),
        [animationRefs]);

    const { clonedScene, size } = useMemo(() => {

        const clone = SkeletonUtils.clone(modelLoaded.scene);

        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        clone.position.sub(center);
        clone.position.y -= (size.y / 2) * -1;

        clone.traverse(obj => {
            if (obj.isBone && obj.name === 'handr') {
                console.log("Hand Bone Found!");
                handRef.current = obj;
            }
        });

        return { clonedScene: clone, size };

    }, [modelLoaded]);

    useEffect(() => {

        if (!handRef.current) {
            console.log(`${entity?.name || entity.id} does not have a hand`);
            return; //Entity does not have a hand
        }

        if (!entity.state_space?.holding || !entity.state_space?.heldItemId) {
            console.log(`${entity?.name} is not holding anything!`);
            return; //Agent isn't holding anything
        }

        const pickedObjectLoad = SkeletonUtils.clone(heldItemGLTF.scene);

        handRef.current.add(pickedObjectLoad);

        pickedObjectLoad.position.set(0.02, 0, 0);
        pickedObjectLoad.rotation.set(0, Math.PI / 2, 0);   
        pickedObjectLoad.scale.set(1, 1, 1);

        console.log("Obj is Picked!");

    }, [entity.state_space?.holding, entity.state_space?.heldItemId, clonedScene])

    const actions = useAnimations(allAnimations, clonedScene);

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
        e.stopPropagation();
        if (!e.shiftKey) return;
        deleteEntity(entity.id);
    }

    useFrame(() => {
        if (playing === false) {
            return;
        }

        if (entity.isDecor || !actions) {
            return;
        }

        const actionPerformed = entity.last_action; //MoveForward, TurnLeft, etc.
        const name = entity.name; //Mage, Lizard, etc.
        //We will play the animation based on last_action
        animationLoop(name, actionPerformed, actions);
    })

    function animationLoop(name, last_action, actions) {
        const animationName = animationsMapper(name, last_action) || null;
        if (actions && animationName) {
            actions["actions"][animationName].play();
        }
    }

    return (
        <group onDoubleClick={(e) => removeEntity(e)} rotation={entity.rotation} position={entity.position}>
            <primitive object={clonedScene} onPointerDown={onPointerDown} />
            <mesh visible={false} position={[0, 1.3, 0]} onPointerDown={onPointerDown}>
                <boxGeometry args={[size.x, size.y, size.z]} />
                <meshBasicMaterial color="orange" opacity={0.2} transparent />
            </mesh>
        </group>
    );
}

export default function EntityMeshes({ entity }) {
    return (
        <>
            <EntityRenderer key={entity.id} entity={entity} />
        </>
    );
}