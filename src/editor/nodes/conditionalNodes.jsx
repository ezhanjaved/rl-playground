import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";
import { useState, useEffect } from "react";

export function InRadiusNode({ data, id }) {
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const deleteNode = useGraphStore((s) => s.deleteNode);
    const nodeId = id;

    function UpdateEntityOne(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                entityOne: event.target.value,
            },
        });
    }

    function UpdateEntityTwo(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                entityTwo: event.target.value,
            },
        });
    }

    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="conditional-node">
            <span className="node-heading">{data?.label}</span>

            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "10px", height: "10px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{ top: "40%", width: "10px", height: "10px", border: "none", background: "red" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{ top: "60%", width: "10px", height: "10px", border: "none", background: "green" }}
            />

            <div className="conditional-data-form">
                <span>Entity One</span>
                <select
                    name="in-radius-entity-one"
                    id="in-radius-entity-one"
                    onChange={UpdateEntityOne}
                    value={data.entityOne ?? "Agent"}
                >
                    <option value="Agent">Agent</option>
                    <option value="Non-State Object">Non-State Object</option>
                    <option value="Pickable Object">Pickable Object</option>
                    <option value="Target Object">Target Object</option>
                </select>

                <br />

                <span>Entity Two</span>
                <select
                    name="in-radius-entity-two"
                    id="in-radius-entity-two"
                    onChange={UpdateEntityTwo}
                    value={data.entityTwo ?? "Pickable Object"}
                >
                    <option value="Agent">Agent</option>
                    <option value="Non-State Object">Non-State Object</option>
                    <option value="Pickable Object">Pickable Object</option>
                    <option value="Target Object">Target Object</option>
                </select>
            </div>
        </div>
    );
}

export function LastActionIsNode({ data, id }) {
    const [selectedOptions, setOption] = useState([]);
    const [allActions, setAllActions] = useState([]);
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const deleteNode = useGraphStore((s) => s.deleteNode);
    const nodeId = id;

    const moveableAction = ["move_up", "move_down", "move_right", "move_left", "idle"];
    const holderAction = ["pick", "drop"];
    const collectorAction = ["collect"];

    const handleCheckbox = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setOption(prev =>
            checked ? [...prev, value] : prev.filter(v => v !== value)
        );
    };

    const actionMap = {
        Moveable: moveableAction,
        Holder: holderAction,
        Collector: collectorAction,
    };

    useEffect(() => {
        const allActions = selectedOptions.flatMap(option => actionMap[option])
        const uniqueActions = [...new Set(allActions)];
        setAllActions(uniqueActions);
    }, [selectedOptions]);

    function updateAgentAction(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                agentCapability: selectedOptions,
                entityAction: event.target.value
            }
        })
    }

    function updateAgentActionStatus(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                actionStatus: event.target.value
            }
        })
    }

    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="conditional-node">
            <span className="node-heading">{data?.label}</span>

            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "10px", height: "10px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{ top: "40%", width: "10px", height: "10px", border: "none", background: "red" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{ top: "60%", width: "10px", height: "10px", border: "none", background: "green" }}
            />

            <div className="conditional-data-form">
                <span>Agent Capabilities</span>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <label><input type="checkbox" value="Moveable" onChange={handleCheckbox} /> Moveable </label>
                    <label><input type="checkbox" value="Holder" onChange={handleCheckbox} /> Holder </label>
                    <label><input type="checkbox" value="Collector" onChange={handleCheckbox} /> Collector</label>
                </div>

                <br />

                <span>Action Performed</span>
                <select onChange={updateAgentAction} value={data?.entityAction}>
                    {allActions.map((action, i) => (
                        <option key={i} value={action}>{action}</option>
                    ))}
                </select>

                <br />

                <span>Action Status</span>
                <select onChange={updateAgentActionStatus} value={data?.actionStatus}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
        </div>
    );
}

export function StateEqualsToNode({ data, id }) {
    const [selectedOptions, setOption] = useState([]);
    const [allStates, setAllStates] = useState([]);

    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const deleteNode = useGraphStore((s) => s.deleteNode);
    const nodeId = id;

    const moveableState = ["targetReached", "notReached"];
    const holderState = ["holding", "lastPickSuccess"];
    const collectorState = ["lastItemCollected", "numberOfitemsCollected", "lastPickSuccess"];

    const stateMap = {
        Moveable: moveableState,
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

    function updateEntityStatusStatus(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                StateStatus: event.target.value
            }
        })
    }

    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="conditional-node">
            <span className="node-heading">{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "10px", height: "10px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{ top: "40%", width: "10px", height: "10px", border: "none", background: "red" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{ top: "60%", width: "10px", height: "10px", border: "none", background: "green" }}
            />
            <div className="conditional-data-form">
                <span>Entity Capabilities</span>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <label><input type="checkbox" value="Moveable" onChange={handleCheckbox} /> Moveable</label>
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

                <span>State Status</span>
                <select onChange={updateEntityStatusStatus} value={data?.StateStatus}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
        </div>
    )
}

export function CompareStateNode({ data, id }) {
    const [selectedOptions, setOption] = useState([]);
    const [allStates, setAllStates] = useState([]);

    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const updateNode = useGraphStore((s) => s.updateNode);
    const deleteNode = useGraphStore((s) => s.deleteNode);
    const nodeId = id;

    const moveableState = ["targetReached", "notReached"];
    const holderState = ["holding", "lastPickSuccess"];
    const collectorState = ["lastItemCollected", "numberOfitemsCollected", "lastPickSuccess"];

    const stateMap = {
        Moveable: moveableState,
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

    function updateOperator(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                Operator: event.target.value
            }
        })
    }

    function updateValue(event) {
        updateNode(activeGraphId, nodeId, {
            data: {
                ...data,
                StateValue: Number(event.target.value)
            }
        })
    }

    return (
        <div onDoubleClick={() => deleteNode(activeGraphId, nodeId)} className="conditional-node">
            <span className="node-heading">{data?.label}</span>
            <Handle
                type="target"
                position={Position.Left}
                style={{ width: "10px", height: "10px", border: "none", background: "#000" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{top: "40%" ,width: "10px", height: "10px", border: "none", background: "red" }}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{top: "60%", width: "10px", height: "10px", border: "none", background: "green" }}
            />  

            <div className="conditional-data-form">
                <span>Entity Capabilities</span>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <label><input type="checkbox" value="Moveable" onChange={handleCheckbox} /> Moveable</label>
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

                <span>Operator</span>
                <select onChange={updateOperator} name="" id="">
                    <option value="Less Than">Less Than</option>
                    <option value="Higher Than">Higher Than</option>
                    <option value="Less Than Equal To">Less Than Equal To</option>
                    <option value="Higher Than Equal To">Higher Than Equal To</option>
                </select>

                <br />

                <span>Value</span>
                <input value={data?.StateValue} onChange={updateValue} type="number" />
            </div>
        </div>
    )
}