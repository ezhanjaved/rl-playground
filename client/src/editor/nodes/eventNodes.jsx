import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";

export function OnStepNode({ data, id }) {
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const nodeId = id;
    const deleteNode = useGraphStore((s) => s.deleteNode);
    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="event-node">
            <span>{data?.label}</span>
            <Handle type="target" position={Position.Left} style={{ width: "10px", height: "10px", border: "none", background: "#000" }} />
            <Handle type="source" position={Position.Right} style={{ width: "10px", height: "10px", border: "none", background: "#000" }} />
        </div>
    )
}

export function OnEpisodeStartNode({ data, id }) {
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const nodeId = id;
    const deleteNode = useGraphStore((s) => s.deleteNode);
    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="event-node">
            <span>{data?.label}</span>
            <Handle type="source" position={Position.Right} style={{ width: "10px", height: "10px", border: "none", background: "#000" }} />
        </div>
    )
}