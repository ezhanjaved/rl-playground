import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";

export function OnStepNode({data, id}) {
    return (
        <div className="event-node">
            <span>{data?.label}</span>
            <Handle type="target" position={Position.Left} style={{width: "5px", height: "5px", border: "none", background: "#000"}}/>
            <Handle type="source" position={Position.Right} style={{width: "5px", height: "5px", border: "none", background: "#000"}}/>
        </div>
    )
}

export function OnEpisodeStartNode({data}) {
    return (
        <div className="event-node">
            <span>{data?.label}</span>
            <Handle type="source" position={Position.Right} style={{width: "5px", height: "5px", border: "none", background: "#000"}}/>
        </div>
    )
}