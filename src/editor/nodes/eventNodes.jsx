import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";

export function OnStepNode(props) {
    return (
        <div className="event-node">
            <span>On Step</span>
            <Handle type="target" position={Position.Left} style={{width: "5x", height: "5px", border: "none", background: "null"}}/>
        </div>
    )
}

export function OnEpisodeStartNode(props) {
    return (
        <div className="event-node">
            <span>On Episode Start</span>
            <Handle type="source" position={Position.Right} style={{width: "5x", height: "5px", border: "none", background: "null"}}/>
        </div>
    )
}