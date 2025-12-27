import "../styling/App.css";
import { useGraphStore } from "../stores/useGraphStore";
import { useSceneStore } from "../stores/useSceneStore";
import { FaInfo } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function  AssignmentControl() {
    const entities = useSceneStore((s) => s.entities);
    const graphs = useGraphStore((s) => s.graphs);
    const updateEntity = useSceneStore((s) => s.updateEntity);
    const addAssignment = useSceneStore((s) => s.addAssignment);
    const deleteAssignment = useSceneStore((s) => s.deleteAssignment);
    const assignments = useSceneStore((s) => s.assignments);

    useEffect(() => {
        console.log("Assignments: " + JSON.stringify(assignments, null, 2));
    }, [assignments])

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
                            <div onClick={() => setPickedEntity(entity.id)} style={{ background: pickedEntity === entity.id ? "#000" : "#fff", color: pickedEntity === entity.id ? "#fff" : "#000" }} key={entity.id} className="single-entity-view">{entity.name} ({entity.tag}) {entity?.isAssigned ? "- Assigned" : ""}</div>
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
                                <label>Set Speed Multiple (Current: {entities?.[pickedEntity]?.settings?.speed})</label>
                                <input value={speed} onChange={(e) => setSpeed(e.target.value)} type="number" />
                                <button onClick={() => updateEntity(pickedEntity, { settings: { speed: speed } })}>Update Speed</button>
                                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <button onClick={() => {addAssignment(pickedEntity, pickedGraph); updateEntity(pickedEntity, { isAssigned: true })}}>Bind Agent</button>
                                    <button onClick={() => {deleteAssignment(pickedEntity); updateEntity(pickedEntity, { isAssigned: false })}}>Unbind Agent</button>
                                </div>
                            </>
                        )}
                        {/* {entities?.[pickedEntity]?.targetVisual && (
                            <>
                                <label>Set Radius (Current: {entities?.[pickedEntity]?.targetVisual?.radius})</label>
                                <input value={radius} onChange={(e) => setRadius(e.target.value)} type="number" />
                                <button onClick={() => updateEntity(pickedEntity, { targetVisual: { radius: radius } })}>Update Radius</button>
                            </>
                        )} */}
                        {entities?.[pickedEntity]?.tag !== "agent" && (
                            <span><FaInfo /> Only Agents can be bonded to a Behavior Graph!</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}