import EntitiesPanel from "../editor/EntitiesPanel";
import EditorCanvas from "../scene/EditorCanvas";
import { DndContext } from "@dnd-kit/core";
import "../styling/index.css";
import { useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";
import { lastPointerWorldPos } from "../scene/EditorCanvas";
import Library from "../components/library";
import TrainingENV from "../components/trainingENV";
import Sidebar from "../components/sidebar";

export default function EnvironmentPage() {
    const addEntity = useSceneStore(s => s.addEntity);
    const initializeScene = useSceneStore(s => s.initializeScene);

    useEffect(() => {
        initializeScene();
    }, [initializeScene])

    const onDragEnd = (event) => {
        console.log("Drag End", event);
        const data = event.active?.data?.current;
        const pos = lastPointerWorldPos ?? [0,0,0];

        if (data) {
            addEntity({...data, position: pos});
        }
    }

    return (
        <>
        
                <DndContext onDragEnd={onDragEnd}>
                    {/* <EntitiesPanel /> */}                  
                    <Library/>
                    <EditorCanvas />
                    {/* <Sidebar/>
                    <TrainingENV/> */}
                </DndContext>

        </>
    )
}