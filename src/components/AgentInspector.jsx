import { createPortal } from "react-dom";
import "../styling/inspector.css";
import { useState, useEffect, useRef } from "react";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";

function AgentInspectorWindow({ open, onClose }) {
  const [position, setPosition] = useState({
    x: window.innerWidth - 460 - 32,
    y: 96,
  });

  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  function handlePointerDown(e) {
    isDragging.current = true;

    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

  function handlePointerMove(e) {
    if (!isDragging.current) return;

    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  }

  function handlePointerUp() {
    isDragging.current = false;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }

  const entitiesStats = useSceneStore((state) => state.entitiesStats);
  const controllerMode = useRunTimeStore((state) => state.controllerMode);

  const [agentsList, setList] = useState([]);
  const [activeAgentId, setAgentId] = useState("");

  useEffect(() => {
    const listOfAgents = Object.keys(entitiesStats);
    setList(listOfAgents);

    if (!activeAgentId && listOfAgents.length > 0) {
      setAgentId(listOfAgents[0]);
    }

    if (activeAgentId && !entitiesStats[activeAgentId]) {
      setAgentId(listOfAgents[0] || "");
    }
  }, [entitiesStats, activeAgentId]);

  if (!open) return null;

  const activeAgentData = entitiesStats[activeAgentId];

  return createPortal(
    <div
      className="agent-inspector-window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="agent-inspector-header" onPointerDown={handlePointerDown}>
        <strong>Agent Inspector</strong>

        <button
          className="agent-inspector-close"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ×
        </button>
      </div>

      <div className="agent-inspector-body">
        <div className="agent-inspector-select-wrapper">
          <label className="agent-inspector-select-label">Active Agent</label>

          <select
            className="agent-inspector-select"
            value={activeAgentId}
            onChange={(e) => setAgentId(e.target.value)}
          >
            <option value="">Select agent</option>

            {agentsList.map((agentId) => (
              <option key={agentId} value={agentId}>
                {agentId}
              </option>
            ))}
          </select>
        </div>

        {!activeAgentData ? (
          <p>No agent selected.</p>
        ) : (
          <>
            <section className="agent-inspector-section">
              <div className="agent-inspector-info">
                <h4>Agent Data</h4>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Capabilities
                  </span>
                  <div className="agent-inspector-pill-list">
                    {activeAgentData.capabilities?.map((value, index) => (
                      <span key={index} className="agent-inspector-pill">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Observation Space
                  </span>
                  <div className="agent-inspector-pill-list">
                    {activeAgentData.observation_space?.map((value, index) => (
                      <span key={index} className="agent-inspector-pill">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Action Space
                  </span>
                  <div className="agent-inspector-pill-list">
                    {activeAgentData.action_space?.map((value, index) => (
                      <span key={index} className="agent-inspector-pill">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="agent-inspector-section">
              <div className="agent-inspector-info">
                <h4>Current Data</h4>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">Step #</span>
                  <span className="agent-inspector-info-value">
                    {activeAgentData.seq}
                  </span>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Controller Mode
                  </span>
                  <span className="agent-inspector-info-value">
                    {controllerMode}
                  </span>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Current Observation Vector
                  </span>

                  <div className="agent-inspector-pill-list">
                    {activeAgentData.observation_vector?.map((value, index) => (
                      <span key={index} className="agent-inspector-pill">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Action Picked
                  </span>
                  <span className="agent-inspector-info-value">
                    {activeAgentData.last_action}
                  </span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default AgentInspectorWindow;
