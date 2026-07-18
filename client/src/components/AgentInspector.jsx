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
  const models_lists = useRunTimeStore((state) => state.models_lists);
  const updateEntity = useSceneStore((state) => state.updateEntity);
  const updateEntityStat = useSceneStore((state) => state.updateEntityStat);

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
  const capabilities = activeAgentData.capabilities; //capabilities is array ["ability1", "ability2"]
  const isFootballPlayer = capabilities.includes("Footballer")

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
                    Behavior-Oriented OBS Space
                  </span>
                  <div className="agent-inspector-pill-list">
                    {activeAgentData.behaviorObs?.map((value, index) => (
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

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    State Space
                  </span>

                  <div className="agent-inspector-pill-list">
                    {Object.entries(activeAgentData.state_space ?? {}).map(
                      ([key, value]) => (
                        <span key={key} className="agent-inspector-pill">
                          {key}: {String(value)}
                        </span>
                      ),
                    )}
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
                    Current Behavior
                  </span>
                  <span className="agent-inspector-info-value">
                    {activeAgentData.current_behavior}
                  </span>
                </div>

                <div className="agent-inspector-info-row">
                  <span className="agent-inspector-info-label">
                    Behavior-Defined OBS Vector
                  </span>

                  <div className="agent-inspector-pill-list">
                    {activeAgentData.behaviorObsVector?.map((value, index) => (
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


                  {isFootballPlayer &&
                    (<div className="agent-inspector-info-row">
                    <span className="agent-inspector-info-label">
                      Opposition Team
                    </span>
                    <span className="agent-inspector-info-value">
                      {activeAgentData.oppTeamId}
                    </span>
                    </div>)}

                  {isFootballPlayer &&
                    (<div className="agent-inspector-info-row">
                    <span className="agent-inspector-info-label">
                      Pick Opposition Team
                    </span>
                    <select
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        updateEntity(activeAgentId, { oppTeamId: selectedValue });
                        updateEntityStat(activeAgentId, { oppTeamId: selectedValue });
                      }}
                    >
                      <option key={"blue"} value={"blue"}>Blue</option>
                      <option key={"green"} value={"green"}>Green</option>
                      <option key={"yellow"} value={"yellow"}>Yellow</option>
                      <option key={"red"} value={"red"}>Red</option>
                    </select>
                  </div>)}

                  <div className="agent-inspector-info-row">
                    <span className="agent-inspector-info-label">
                      Current Trained Policy Id
                    </span>
                    <span className="agent-inspector-info-value">
                      {activeAgentData.trainedPolicyId}
                    </span>
                  </div>

                <div className="agent-inspector-info-row">
                    <span className="agent-inspector-info-label">
                      Policies Available
                    </span>
                    <select
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        updateEntity(activeAgentId, { trainedPolicyId: selectedValue });
                        updateEntityStat(activeAgentId, { trainedPolicyId: selectedValue });
                      }}
                    >
                      {Object.entries(models_lists).map(([value, label]) => (
                        <option key={value} value={label}>
                          {value}
                        </option>
                      ))}
                    </select>
                </div>

              </div>
            </section>

            {activeAgentData.probabilities &&
              activeAgentData.probabilities.length > 0 && (
                <section className="agent-inspector-section">
                  <div className="agent-inspector-info">
                    <h4>Action Probability Distribution</h4>

                    {activeAgentData.probabilities.map(({ action, prob }) => {
                      const masked = prob === 0;
                      const pct = (prob * 100).toFixed(1);
                      return (
                        <div key={action} className="agent-inspector-prob-row">
                          <span className="agent-inspector-prob-label">
                            {action}
                          </span>
                          <div className="agent-inspector-bar-track">
                            <div
                              className={`agent-inspector-bar-fill ${masked ? "masked" : "active"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span
                            className={`agent-inspector-bar-pct ${masked ? "masked" : ""}`}
                          >
                            {masked ? "—" : `${pct}%`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default AgentInspectorWindow;
