import "../styling/App.css";
import { useGraphStore } from "../stores/useGraphStore";
import { useSceneStore } from "../stores/useSceneStore";
import { FaInfo } from "react-icons/fa";
import { useState } from "react";

export function AssignmentControl() {
    const entities = useSceneStore((s) => s.entities);
    const graphs = useGraphStore((s) => s.graphs);
    const updateEntity = useSceneStore((s) => s.updateEntity);
    const [pickedEntity, setPickedEntity] = useState(null);
    const [pickedGraph, setPickedGraph] = useState(null);
    const [speed, setSpeed] = useState(1);
    const [radius, setRadius] = useState(1);

    return (
        <>
            <div className="trainingEnvContainer">
                <div className="entities-list">
                    <div className="single-entity">
                        <h2>Graphs</h2>
                        <hr />
                        {Object.values(graphs).map(graph => (
                            <div onClick={() => setPickedGraph(graph.id)} key={graph.id} style={{ background: pickedGraph === graph.id ? "#000" : "#fff", color: pickedGraph === graph.id ? "#fff" : "#000" }} className="single-entity-view">{graph?.name || null}</div>
                        ))}
                    </div>
                    <div className="single-entity">
                        <h2>Entities</h2>
                        <hr />
                        {Object.values(entities).map(entity => (
                            <div onClick={() => setPickedEntity(entity.id)} style={{ background: pickedEntity === entity.id ? "#000" : "#fff", color: pickedEntity === entity.id ? "#fff" : "#000" }} key={entity.id} className="single-entity-view">{entity.name} ({entity.tag})</div>
                        ))}
                    </div>
                </div>
                <div className="entities-setting">
                    <h2>Assignment Panel</h2>
                    <hr />
                    <div className="entity-info">
                        <span>Tag: {entities?.[pickedEntity]?.tag || "None"}</span>
                        <span>ID: {entities?.[pickedEntity]?.id || "None"}</span>
                        {entities?.[pickedEntity]?.tag === "agent" && (
                            <>
                                <label>Set Speed Multiple (Default 1)</label>
                                <input value={speed} onChange={(e) => setSpeed(e.target.value)} type="number" />
                                <button onClick={() => updateEntity(pickedEntity, { settings: { speed: speed } })}>Update Speed</button>
                                <button>Bind Agent</button>
                            </>
                        )}
                        {entities?.[pickedEntity]?.isTarget && (
                            <>
                                <label>Set Radius (Default 1)</label>
                                <input value={radius} onChange={(e) => setRadius(e.target.value)} type="number" />
                                <button onClick={() => updateEntity(pickedEntity, { targetVisual: { radius: radius } })}>Update Radius</button>
                            </>
                        )}
                        {entities?.[pickedEntity]?.tag !== "agent" && (
                            <span><FaInfo /> Only Agents can be bonded to a Behavior Graph!</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}