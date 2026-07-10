import { DndContext } from "@dnd-kit/core";
import "../styling/index.css";
import { useSceneStore } from "../stores/useSceneStore";
import { lastPointerWorldPos } from "../scene/EditorCanvas";
import TrainingENV from "../components/trainingENV";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarV2 from "../components/SidebarV2";

export default function EnvironmentPage() {
  const addEntity = useSceneStore((s) => s.addEntity);

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
      <div className="container">
        <Header />
        <DndContext onDragEnd={onDragEnd}>
          <SidebarV2 />
          <TrainingENV />
        </DndContext>
      </div>
    </>
  );
}
