// R3F <Canvas>; mounts world + debug
import "../styling/App.css"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, Grid } from "@react-three/drei"
import World from '../scene/World.jsx';
import React from "react";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore.js";
import runTimeloop from "../engine/runtime/runtimeLoop.js";
export let lastPointerWorldPos = [0, 0, 0];
export let orbitControlsRef = null;
import { useCanvasSetting } from "../stores/useCanvasSetting.js";

export default function EditorCanvas() {

    const controlRef = React.useRef();
    orbitControlsRef = controlRef;

    const colorLibrary = useCanvasSetting((state) => state.colorLibrary);
    const pickedColor = useCanvasSetting((state) => state.pickedColor);
    const [colorCanvas, colorGrid] = colorLibrary[pickedColor];
    
    function PlaySimulation() {
    
        useFrame(() => {
            const playing = useRunTimeStore.getState().playing;
            if (!playing) return;
            const { entities } = useSceneStore.getState();
            runTimeloop(entities);
        });
        
        return null;
    }

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
                <Canvas camera={{ position: [0, 5, 10], fov: 50 }} style={{ width: "100%", height: "570px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <color attach="background" args={[colorCanvas]} />

                    <World />

                    <PointerTracker />

                    <ambientLight intensity={1.2} />
                    <directionalLight position={[15, 15, 15]} />

                    {/* <TestCharacter /> */}
                    <PlaySimulation /> {/* //My understanding is that this will run on each frame */}

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
                        sectionColor={colorGrid}
                    />

                    {/* <axesHelper args={[10]} /> */}

                </Canvas>
            </div>
        </>
    )
}