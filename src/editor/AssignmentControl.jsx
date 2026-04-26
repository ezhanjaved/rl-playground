import "../styling/AssignmentControl.css";
import { useGraphStore } from "../stores/useGraphStore";
import { useSceneStore } from "../stores/useSceneStore";
import { FaInfo, FaLink, FaUnlink, FaBolt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AssignmentControl() {
  const entities = useSceneStore((s) => s.entities);
  const graphs = useGraphStore((s) => s.graphs);
  const updateEntity = useSceneStore((s) => s.updateEntity);
  const addAssignment = useSceneStore((s) => s.addAssignment);
  const deleteAssignment = useSceneStore((s) => s.deleteAssignment);
  const assignments = useSceneStore((s) => s.assignments);

  useEffect(() => {
    console.log("Assignments: " + JSON.stringify(assignments, null, 2));
  }, [assignments]);

  const [pickedEntity, setPickedEntity] = useState(null);
  const [pickedGraph, setPickedGraph] = useState(null);
  const [speed, setSpeed] = useState(1);

  const selectedEntity = entities?.[pickedEntity];
  const isAgent = selectedEntity?.tag === "agent";

  return (
    <div className="ac-root">
      {/* Header */}
      <div className="ac-header">
        <span className="ac-header-pill">Assignment Control</span>
        <span className="ac-header-sub">Bind agents to behavior graphs</span>
      </div>

      {/* Two-column selector */}
      <div className="ac-selectors">
        {/* Graphs */}
        <div className="ac-panel">
          <div className="ac-panel-title">
            <span className="ac-dot ac-dot--blue" />
            Graphs
          </div>
          <div className="ac-list">
            {Object.values(graphs).length === 0 && (
              <span className="ac-empty">No graphs available</span>
            )}
            {Object.values(graphs).map((graph) => {
              const active = pickedGraph === graph.id;
              return (
                <button
                  key={graph.id}
                  className={`ac-list-item ${active ? "ac-list-item--active" : ""}`}
                  onClick={() => setPickedGraph(graph.id)}
                >
                  <span className="ac-list-item-dot" />
                  <span className="ac-list-item-label">
                    {graph?.name || graph.id}
                  </span>
                  {active && (
                    <span className="ac-badge ac-badge--selected">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Entities */}
        <div className="ac-panel">
          <div className="ac-panel-title">
            <span className="ac-dot ac-dot--green" />
            Entities
          </div>
          <div className="ac-list">
            {Object.values(entities).length === 0 && (
              <span className="ac-empty">No entities available</span>
            )}
            {Object.values(entities).map((entity) => {
              const active = pickedEntity === entity.id;
              return (
                <button
                  key={entity.id}
                  className={`ac-list-item ${active ? "ac-list-item--active" : ""}`}
                  onClick={() => setPickedEntity(entity.id)}
                >
                  <span className="ac-list-item-dot" />
                  <span className="ac-list-item-label">
                    {entity.name}
                    <span className="ac-tag">#{entity.tag}</span>
                  </span>
                  {entity?.isAssigned && (
                    <span className="ac-badge ac-badge--assigned">Bound</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assignment Panel */}
      <div className="ac-detail">
        <div className="ac-detail-header">
          <span>Assignment Panel</span>
          {selectedEntity && (
            <span className="ac-detail-id">ID: {selectedEntity.id}</span>
          )}
        </div>

        {!selectedEntity ? (
          <div className="ac-placeholder">
            <FaInfo className="ac-placeholder-icon" />
            <span>Select an entity to configure its assignment</span>
          </div>
        ) : !isAgent ? (
          <div className="ac-placeholder ac-placeholder--warn">
            <FaInfo className="ac-placeholder-icon" />
            <span>
              Only <strong>agents</strong> can be bound to a Behavior Graph
            </span>
          </div>
        ) : (
          <div className="ac-agent-config">
            {/* Meta row */}
            <div className="ac-meta-row">
              <div className="ac-meta-chip">
                <span className="ac-meta-label">Tag</span>
                <span className="ac-meta-value">{selectedEntity.tag}</span>
              </div>
              <div className="ac-meta-chip">
                <span className="ac-meta-label">Graph</span>
                <span className="ac-meta-value">
                  {pickedGraph ? graphs[pickedGraph]?.name || pickedGraph : "—"}
                </span>
              </div>
              <div className="ac-meta-chip">
                <span className="ac-meta-label">Status</span>
                <span
                  className={`ac-meta-value ${selectedEntity.isAssigned ? "ac-status--bound" : "ac-status--free"}`}
                >
                  {selectedEntity.isAssigned ? "Bound" : "Unbound"}
                </span>
              </div>
            </div>

            {/* Speed control */}
            <div className="ac-field-group">
              <label className="ac-field-label">
                <FaBolt style={{ marginRight: 6, opacity: 0.6 }} />
                Speed Multiplier
                <span className="ac-field-current">
                  current: {selectedEntity?.settings?.speed ?? "—"}
                </span>
              </label>
              <div className="ac-field-row">
                <input
                  className="ac-input"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  type="number"
                  min={0}
                  step={0.1}
                />
                <button
                  className="ac-btn ac-btn--ghost"
                  onClick={() =>
                    updateEntity(pickedEntity, { settings: { speed } })
                  }
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Bind / Unbind */}
            <div className="ac-actions">
              <button
                className="ac-btn ac-btn--bind"
                onClick={() => {
                  addAssignment(pickedEntity, pickedGraph);
                  updateEntity(pickedEntity, { isAssigned: true });
                }}
                disabled={!pickedGraph}
              >
                <FaLink style={{ marginRight: 8 }} />
                Bind Agent
              </button>
              <button
                className="ac-btn ac-btn--unbind"
                onClick={() => {
                  deleteAssignment(pickedEntity);
                  updateEntity(pickedEntity, { isAssigned: false });
                }}
                disabled={!selectedEntity.isAssigned}
              >
                <FaUnlink style={{ marginRight: 8 }} />
                Unbind Agent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
