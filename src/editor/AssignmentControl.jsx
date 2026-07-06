import "../styling/AssignmentControl.css";
import { useGraphStore } from "../stores/useGraphStore";
import { useSceneStore } from "../stores/useSceneStore";
import { FaInfo, FaLink, FaUnlink, FaBolt, FaBrain } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AssignmentControl() {
  const entities = useSceneStore((s) => s.entities);
  const graphs = useGraphStore((s) => s.graphs);
  const updateEntity = useSceneStore((s) => s.updateEntity);
  const addAssignment = useSceneStore((s) => s.addAssignment);
  const deleteAssignment = useSceneStore((s) => s.deleteAssignment);
  const assignments = useSceneStore((s) => s.assignments);
  const [pickedBehavior, setPickedBehavior] = useState(null);
  const [behaviorCount, setBehaviorCount] = useState(1);

  useEffect(() => {
    console.log("Assignments: " + JSON.stringify(assignments, null, 2));
  }, [assignments]);

  const [pickedEntity, setPickedEntity] = useState(null);
  const [pickedGraph, setPickedGraph] = useState(null);
  const [speed, setSpeed] = useState(1);

  const selectedEntity = entities?.[pickedEntity];
  const isAgent = selectedEntity?.tag === "agent";

  useEffect(() => {
    if (!pickedBehavior) return;
    const beh = (selectedEntity?.behavior ?? []).find(
      (b) => b.type === pickedBehavior,
    );
    setBehaviorCount(beh?.requiredCount ?? 1);
  }, [pickedBehavior, selectedEntity]);

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

            {/* ── BEHAVIOR EDITOR ── place between Speed Multiplier and Bind/Unbind ── */}
            <div className="ac-field-group">
              <label className="ac-field-label">
                <FaBrain style={{ marginRight: 6, opacity: 0.6 }} />
                Behavior Editor
              </label>

              {/* Behavior selector dropdown */}
              <div className="ac-field-row" style={{ marginBottom: 8 }}>
                <select
                  className="ac-input ac-select"
                  value={pickedBehavior ?? ""}
                  onChange={(e) => setPickedBehavior(e.target.value)}
                >
                  <option value="" disabled>
                    Select a behavior…
                  </option>
                  {(selectedEntity.behavior ?? []).map((b, i) => (
                    <option key={i} value={b.type}>
                      {b.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detail card — only when one is selected */}
              {pickedBehavior &&
                (() => {
                  const beh = (selectedEntity.behavior ?? []).find(
                    (b) => b.type === pickedBehavior,
                  );
                  if (!beh) return null;
                  return (
                    <div className="ac-behavior-card">
                      {/* Required count row */}
                      <div className="ac-behavior-row">
                        <span className="ac-behavior-row-label">
                          Required count
                        </span>
                        <span className="ac-behavior-current">
                          current: {beh.requiredCount}
                        </span>
                        <div className="ac-field-row ac-behavior-input-row">
                          <input
                            className="ac-input ac-input--sm"
                            type="number"
                            min={1}
                            step={1}
                            value={behaviorCount}
                            onChange={(e) => setBehaviorCount(e.target.value)}
                          />
                          <button
                            className="ac-btn ac-btn--ghost"
                            onClick={() => {
                              const updatedBehavior =
                                selectedEntity.behavior.map((b) =>
                                  b.type === pickedBehavior
                                    ? {
                                        ...b,
                                        requiredCount: Number(behaviorCount),
                                      }
                                    : b,
                                );
                              updateEntity(pickedEntity, {
                                behavior: updatedBehavior,
                              });
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      {/* Taught toggle row */}
                      <div className="ac-behavior-row ac-behavior-row--taught">
                        <div className="ac-behavior-taught-info">
                          <span className="ac-behavior-row-label">Taught</span>
                          <span
                            className={`ac-taught-badge ${beh.status ? "ac-taught-badge--yes" : "ac-taught-badge--no"}`}
                          >
                            {beh.status ? "Yes" : "No"}
                          </span>
                        </div>
                        <button
                          className={`ac-btn ac-btn--taught ${beh.status ? "ac-btn--taught-revoke" : "ac-btn--taught-grant"}`}
                          onClick={() => {
                            const nextStatus = !beh.status;
                            const updatedBehavior = selectedEntity.behavior.map(
                              (b) =>
                                b.type === pickedBehavior
                                  ? { ...b, status: nextStatus }
                                  : b,
                            );
                            updateEntity(pickedEntity, {
                              behavior: updatedBehavior,
                            });
                            simpleChange(
                              pickedBehavior,
                              selectedEntity,
                              nextStatus,
                              beh.requiredCount,
                            );
                          }}
                        >
                          {beh.status ? "Revoke" : "Mark as taught"}
                        </button>
                      </div>
                    </div>
                  );
                })()}
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

const PROGRESS_FIELD_MAP = {
  Collect: "total_items_collected",
  Holding: "holding",
  Deposit: "items_deposited",
  Open: "gates_open",
  Destroy: "items_destroyed",
  Find: "in_target_radius",
};

const SIDE_EFFECTS = {
  Collect: {
    taught: (rc) => ({
      items_collected: rc,
      total_items_collected: rc,
      keys_collected: rc === 1 ? rc : rc - 1,
    }),
    revoked: () => ({
      items_collected: 0,
      total_items_collected: 0,
      keys_collected: 0,
    }),
  },
  Deposit: {
    taught: (rc) => ({ items_collected: 0, items_deposited: rc }),
    revoked: () => ({ items_deposited: 0 }),
  },
  Open: {
    taught: () => ({ keys_collected: 0 }),
    revoked: () => ({ keys_collected: 0 }),
  },
};

/**
 * Syncs state_space after a behavior's taught status changes.
 * @param {string} behaviorType  - The behavior type string (e.g. "Collect")
 * @param {object} entity        - The entity object as it existed before the update
 * @param {boolean} nextStatus   - The NEW status value (true = taught, false = revoked)
 * @param {number} requiredCount - The behavior's requiredCount at the time of the toggle
 */

function simpleChange(behaviorType, entity, nextStatus, requiredCount) {
  const { entities, updateEntity } = useSceneStore.getState();
  const freshData = entities[entity.id];
  const newStateSpace = { ...freshData.state_space };

  const primaryField = PROGRESS_FIELD_MAP[behaviorType];

  if (nextStatus) {
    if (primaryField) {
      newStateSpace[primaryField] = requiredCount;
    }
    const sideEffects =
      SIDE_EFFECTS[behaviorType]?.taught?.(requiredCount) ?? {};
    Object.assign(newStateSpace, sideEffects);
  } else {
    if (primaryField) {
      newStateSpace[primaryField] = 0;
    }
    const sideEffects =
      SIDE_EFFECTS[behaviorType]?.revoked?.(requiredCount) ?? {};
    Object.assign(newStateSpace, sideEffects);
  }

  updateEntity(freshData.id, { state_space: newStateSpace });
}
