// R3F <Canvas>; mounts world + debug
import "../styling/App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"

export default function EditorCanvas() {
 
    return (
        <>
            <div className="environment">
                <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>

                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} />

                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={20}
                    />

                    <Grid
                        args={[50, 50]}
                        sectionColor={"#000000ff"}
                        infiniteGrid
                    />

                    <axesHelper args={[5,5,5]} />

                </Canvas>
            </div>
        </>
    )
}