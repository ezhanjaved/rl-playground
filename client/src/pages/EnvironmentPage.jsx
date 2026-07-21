import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import "../styling/index.css";
import { useSceneStore } from "../stores/useSceneStore";
import { lastPointerWorldPos } from "../scene/EditorCanvas";
import TrainingENV from "../components/TrainingENV";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import { useRunTimeStore } from "../stores/useRunTimeStore";


export default function EnvironmentPage() {
  const addEntity = useSceneStore((s) => s.addEntity);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playing = useRunTimeStore((state) => state.playing);
  const togglePlaying = useRunTimeStore((state) => state.togglePlaying);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDownSpace = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlaying();
      }
    };

    window.addEventListener("keydown", handleKeyDownSpace);

    return () => {
      window.removeEventListener("keydown", handleKeyDownSpace);
    };
  });

  const onDragEnd = (event) => {
    console.log("Drag End", event);
    const data = event.active?.data?.current;
    const pos = lastPointerWorldPos ?? [0, 0, 0];

    if (data) {
      addEntity({ ...data, position: pos });
    }
  };

  return (
    <>
      <div className={`container${isFullscreen ? " fullscreen" : ""}`}>
        <Header />
        <DndContext onDragEnd={onDragEnd}>
          <SidebarV2 />
          <TrainingENV
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(true)}
          />
        </DndContext>
      </div>
    </>
  );
}
