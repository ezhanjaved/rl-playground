// R3F <Canvas>; mounts world + debug
import "../styling/App.css"
import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, Grid } from "@react-three/drei"
import React from "react";
import World from '../scene/World.jsx';
export let lastPointerWorldPos = [0,0,0];

export default function EditorCanvas() {

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
            lastPointerWorldPos= [intersection.x, intersection.y, intersection.z];
        }

        React.useEffect(() => {
            gl.domElement.addEventListener('pointermove', onPointerMove);
            return () => gl.domElement.removeEventListener('pointermove', onPointerMove);
        }, [gl, camera]);

        return null;
    }

    return (
        <>
            <div className="environment">
                <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>

                    <PointerTracker />

                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} />

                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={20}
                    />

                    <World />

                    <Grid
                        args={[100, 150]}
                        sectionColor={"#000000"}
                        infiniteGrid
                    />

                    {/* <axesHelper args={[5]} /> */}
                    <boxGeometry />

                </Canvas>
            </div>
        </>
    )
}