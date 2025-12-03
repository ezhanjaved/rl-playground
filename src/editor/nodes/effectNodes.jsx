import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";
import { useState, useEffect } from "react";

export function EndEpisodeNode({ data }) {
    return (
        <div className="event-node">
            <span>{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />
        </div>
    )
}

export function AddRewardNode({ data, id }) {
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const nodeId = id;

    function updateRewardValue(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                rewardValue: event.target.value
            }
        })
    }
    return (
        <div className="effect-node">
            <span className="node-heading">{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />
            <div className="effect-data-form">
                <span>Reward Value</span>
                <input type="number" value={data?.rewardValue} onChange={updateRewardValue} />
                <br />
            </div>
        </div>
    )
}

export function SetStateNode({ data, id }) {
    const [selectedOptions, setOption] = useState([]);
    const [allStates, setAllStates] = useState([]);

    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const nodeId = id;

    const holderState = ["holding", "lastPickSuccess"];
    const collectorState = ["lastItemCollected", "numberOfitemsCollected", "lastPickSuccess"];

    const stateMap = {
        Holder: holderState,
        Collector: collectorState,
    };

    const handleCheckbox = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        setOption(prev =>
            checked ? [...prev, value] : prev.filter(v => v !== value)
        );
    };

    useEffect(() => {
        setAllStates([]);
        const allStates = selectedOptions.flatMap(option => stateMap[option])
        const uniqueStates = [...new Set(allStates)];
        setAllStates(uniqueStates);
    }, [selectedOptions]);

    function updateEntityState(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                entityCapability: selectedOptions,
                entityState: event.target.value
            }
        })
    }

    function updateEntityStateValue(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                stateValue: event.target.value
            }
        })
    }
    return (
        <div className="effect-node">
            <span className="node-heading">{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />
            <div className="effect-data-form">
                <span>Entity Capabilities</span>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label><input type="checkbox" value="Holder" onChange={handleCheckbox} /> Holder</label>
                    <label><input type="checkbox" value="Collector" onChange={handleCheckbox} /> Collector</label>
                </div>

                <br />

                <span>Entity State</span>
                <select onChange={updateEntityState} value={data?.entityState}>
                    {allStates.map((state, i) => (
                        <option key={i} value={state}>{state}</option>
                    ))}
                </select>

                <br />

                <span>Value</span>
                <input type="text" value={data?.stateValue} onChange={updateEntityStateValue} />
            </div>
        </div>
    )
}

export function RequestAction({ data }) {
    return (
        <div className="event-node">
            <span>{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                style={{ width: "5px", height: "5px", border: "none", background: "#000" }}
            />
        </div>
    )
}