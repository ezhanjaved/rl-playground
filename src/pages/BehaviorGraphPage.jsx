import "../styling/index.css";
import Header from "../components/header";
import { BehaviorGraphEditor } from "../editor/BehaviorGraphEditor.jsx";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { DndContext } from "@dnd-kit/core";
import { useGraphStore } from "../stores/useGraphStore.js";
export default function BehaviorGraphPage({setCurrentPage}) {
    const addGraph = useGraphStore(s => s.addGraph);
    const activeGraphId = useGraphStore(s => s.activeGraphId);
    const addNode = useGraphStore(s => s.addNode);

    useEffect(() => {
        console.log("Making our first graph!");
        addGraph();
    }, [addGraph])

    const onDragEnd = (event) => {
        console.log("Drag End", event);
        const data = event.active?.data?.current;
        if (data) {
            addNode(activeGraphId, data);
        }
    }

    return (
        <>
            <div className="container">
                <Header />
                <DndContext onDragEnd={onDragEnd}>
                    <Sidebar setCurrentPage={setCurrentPage} />
                    <BehaviorGraphEditor />
                </DndContext>
            </div>
        </>
    )
}