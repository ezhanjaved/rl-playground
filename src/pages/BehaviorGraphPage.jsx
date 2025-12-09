import "../styling/index.css";
import Header from "../components/header";
import { BehaviorGraphEditor } from "../editor/BehaviorGraphEditor.jsx";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { DndContext } from "@dnd-kit/core";
import { useGraphStore } from "../stores/useGraphStore.js";

export default function BehaviorGraphPage() {
    const addGraph = useGraphStore(s => s.addGraph);
    const activeGraphId = useGraphStore(s => s.activeGraphId);
    const addNode = useGraphStore(s => s.addNode);
    const totalGraph= useGraphStore(s => s.totalGraph);

    useEffect(() => {
        if (totalGraph.length === 0) {
            console.log("Making our first graph!");
            addGraph();
        }
    }, [])

    const onDragEnd = (event) => {
        const nodeData = event.active?.data?.current;
        console.log(event);
        if (!nodeData) return;

        const nodeId = `node_${crypto.randomUUID()}`;

        const pointerEvent = event.activatorEvent;

        const position = {
            x: pointerEvent.clientX,
            y: pointerEvent.clientY,
        };

        const newNode = {
            ...nodeData,
            id: nodeId,
            position: position
        };

        addNode(activeGraphId, newNode);
    };

    return (
        <>
            <div className="container">
                <Header />
                    <DndContext onDragEnd={onDragEnd}>
                        <Sidebar />
                        <BehaviorGraphEditor />
                    </DndContext>
            </div>
        </>
    )
}