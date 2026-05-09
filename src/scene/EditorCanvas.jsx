// R3F <Canvas>; mounts world + debug
import "../styling/App.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Grid } from "@react-three/drei";
import World from "../scene/World.jsx";
import React from "react";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore.js";
import runTimeloop from "../engine/runtime/runtimeLoop.js";
export let lastPointerWorldPos = [0, 0, 0];
export let orbitControlsRef = null;
import { useCanvasSetting } from "../stores/useCanvasSetting.js";
import { Perf } from "r3f-perf";
import { convertRot } from "../engine/utility/rotationCal.js";

// Shared rotation state — mirrors the pattern used by lastPointerWorldPos
export let rotationDragState = {
  isRotating: false,
  startAngle: 0,
  baseRotY: 0,
};

export default function CanvasPad() {
  const controlRef = React.useRef();
  orbitControlsRef = controlRef;

  const colorLibrary = useCanvasSetting((state) => state.colorLibrary);
  const pickedColor = useCanvasSetting((state) => state.pickedColor);
  const [colorCanvas, colorGrid] = colorLibrary[pickedColor];

  function SimulationLoop() {
    useFrame(() => {
      const { playing, training } = useRunTimeStore.getState();
      if (!playing && !training) return;

      const { entities } = useSceneStore.getState();
      runTimeloop(entities);
    });
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

    // Compute world-space XZ angle from entity center to pointer
    function getPointerAngle(event) {
      const rect = gl.domElement.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const rc = new THREE.Raycaster();
      rc.setFromCamera(new THREE.Vector2(mx, my), camera);

      const point = new THREE.Vector3();
      rc.ray.intersectPlane(plane, point);

      const { activeEntity, entities } = useSceneStore.getState();
      if (!activeEntity || !entities[activeEntity]) return null;

      const pos = entities[activeEntity].position;
      return Math.atan2(point.z - pos[2], point.x - pos[0]);
    }

    const onPointerMove = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      setLastPointerWorldPos(intersection);

      // Handle rotation drag
      if (rotationDragState.isRotating) {
        const angle = getPointerAngle(event);
        if (angle === null) return;

        // First move after right-click: capture the baseline angle
        if (isNaN(rotationDragState.startAngle)) {
          rotationDragState.startAngle = angle;
          return;
        }

        const delta = angle - rotationDragState.startAngle;
        let newRotY = rotationDragState.baseRotY + delta;

        // Hold Shift to snap to 45° increments
        if (event.shiftKey) {
          newRotY = Math.round(newRotY / (Math.PI / 4)) * (Math.PI / 4);
        }

        const { activeEntity, entities, updateEntity } =
          useSceneStore.getState();
        if (!activeEntity) return;
        const entity = entities[activeEntity];
        const currentRot = entity?.rotation ?? [0, 0, 0];
        console.log("New Euler Rot: " + currentRot);
        const quat = convertRot(currentRot);
        console.log("New Quat Rot: " + quat.w);
        updateEntity(activeEntity, {
          rotation: [currentRot[0], newRotY, currentRot[2]],
          quatRotation: quat ? [quat.x, quat.y, quat.z, quat.w] : [0, 0, 0, 1],
        });
      }
    };

    function PointerUp() {
      const { isDragging, setDragging } = useSceneStore.getState();

      if (isDragging) {
        setDragging(false);
        if (orbitControlsRef?.current) {
          orbitControlsRef.current.enabled = true;
        }
      }

      if (rotationDragState.isRotating) {
        rotationDragState.isRotating = false;
        if (orbitControlsRef?.current) {
          orbitControlsRef.current.enabled = true;
        }
      }
    }

    React.useEffect(() => {
      gl.domElement.addEventListener("pointermove", onPointerMove);
      gl.domElement.addEventListener("pointerup", PointerUp);
      // Prevent context menu on right-click so rotation drag works cleanly
      gl.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
      return () => {
        gl.domElement.removeEventListener("pointermove", onPointerMove);
        gl.domElement.removeEventListener("pointerup", PointerUp);
      };
    }, [gl, camera]);

    return null;
  }

  return (
    <>
      <div className="environment">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          style={{
            width: "100%",
            height: "570px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <color attach="background" args={[colorCanvas]} />
          <World /> //Render
          <PointerTracker />
          <ambientLight intensity={1.2} />
          <directionalLight position={[15, 15, 15]} />
          {/* <TestCharacter /> */}
          <SimulationLoop />{" "}
          {/* //My understanding is that this will run on each frame */}
          <OrbitControls
            ref={controlRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
          <Grid args={[100, 100]} sectionColor={colorGrid} />
          <axesHelper args={[10]} />
          <Perf position="bottom-right" />
        </Canvas>
      </div>
    </>
  );
}
