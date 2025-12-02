import { ReactFlow, Background, Controls } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useGraphStore } from "../stores/useGraphStore.js";

export function BehaviorGraphEditor() {
    const activeGraphId = useGraphStore(s => s.activeGraphId);
    const graphs = useGraphStore(s=>s.graphs);
    const graph = graphs?.[activeGraphId];

    return (
        <div className="trainingEnvContainer" >
            <ReactFlow nodes={graph?.nodes} edges={graph?.edges}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}