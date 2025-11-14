import EntitiesPanel from "../editor/EntitiesPanel";
import EditorCanvas from "../scene/EditorCanvas";
import { DndContext } from "@dnd-kit/core";
import "../styling/index.css";
import { useSceneStore } from "../stores/useSceneStore";

export default function EnvironmentPage() {
    const addEntity = useSceneStore(s => s.addEntity);

    // const onDragEnd = (event) => {
    //     const data = event.active?.data?.current;
    //     const pos = lastPointerWorldPos ?? [0,0,0]

    //     if (data) {
    //         addEntity({...data, position: pos});
    //     }
    // }

    return (
        <>
            <div className="page-env">
                <DndContext>
                    <EntitiesPanel />
                    <EditorCanvas />
                </DndContext>
            </div>
        </>
    )
}