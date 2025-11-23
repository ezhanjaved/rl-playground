// R3F <Canvas>; mounts world + debug
import "../styling/App.css"
import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, Grid } from "@react-three/drei"
import React from "react";
import World from '../scene/World.jsx';
import { useSceneStore } from "../stores/useSceneStore";
export let lastPointerWorldPos = [0, 0, 0];
export let orbitControlsRef = null;

export default function EditorCanvas() {

    const controlRef = React.useRef();
    orbitControlsRef = controlRef;

    function setLastPointerWorldPos(intersection) {
        lastPointerWorldPos = [intersection.x, intersection.y, intersection.z];
        const { activeEntity, isDragging, updateEntity } = useSceneStore.getState();
        if (activeEntity && isDragging) {
            updateEntity(activeEntity, { position: lastPointerWorldPos });
        }
    }

    function PointerTracker() {
        const { camera, gl } = useThree();
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onPointerMove = (event) => {
            const rect = gl.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersection = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, intersection);
            setLastPointerWorldPos(intersection);
        }

        function PointerUp() {
            console.log("Pointer up event detected");
            const { isDragging, setDragging } = useSceneStore.getState();
            if (isDragging) {
                setDragging(false);
                if (orbitControlsRef && orbitControlsRef.current) {
                    orbitControlsRef.current.enabled = true;
                }
            }
        }

        React.useEffect(() => {
            gl.domElement.addEventListener('pointermove', onPointerMove);
            gl.domElement.addEventListener('pointerup', PointerUp);
            return () => {
                gl.domElement.removeEventListener('pointermove', onPointerMove);
                gl.domElement.removeEventListener('pointerup', PointerUp);
            }
        }, [gl, camera]);

        return null;
    }

    return (
        <>
            <div className="environment">
                <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                    <color attach="background" args={["#b2fba5"]} />
                    
                    <World />

                    <PointerTracker />

                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} />

                    {/* <TestCharacter /> */}

                    <OrbitControls
                        ref={controlRef}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={20}
                    />

                    <Grid
                        args={[100, 100]}
                        sectionColor={"#91bc9e55"}
                    />

                    <axesHelper args={[10]} />

                </Canvas>
            </div>
        </>
    )
}