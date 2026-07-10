import "../styling/App.css";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useMemo, useState } from "react";

export function TrainingInfoPanel() {
  return (
    <div className="library_main">
      <AssignedAgents />
    </div>
  );
}

const AssignedAgents = () => {
  const [open, setOpen] = useState(true);

  const currentExperimentId = useRunTimeStore((s) => s.currentExperimentId);
  const experiments = useRunTimeStore((s) => s.experiments);
  const setAgent = useRunTimeStore((s) => s.setAgent);
  const selectedAgent = useRunTimeStore((s) => s.selectedAgent);
  const entities = useSceneStore((s) => s.entities);

  const expAgents = experiments?.[currentExperimentId]?.agents ?? {};
  const agentIds = useMemo(() => Object.keys(expAgents), [expAgents]);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: "#e6e6e6" }}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>Assigned Agents</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="gridWrapper"
          style={{
            padding: "6px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {agentIds.length === 0 ? (
            <div className="emptyText">No agents assigned</div>
          ) : (
            agentIds.map((agentId) => {
              const name = entities?.[agentId]?.name ?? agentId;
              const isSelected = selectedAgent === agentId;

              return (
                <button
                  key={agentId}
                  type="button"
                  onClick={() => setAgent(agentId)}
                  title={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: isSelected
                      ? "1px solid #c4b5fd"
                      : "1px solid transparent",
                    background: isSelected ? "#ede9fe" : "transparent",
                    color: isSelected ? "#7c3aed" : "#374151",
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 400,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.12s",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className={`agentRow ${isSelected ? "activeAgent" : ""}`}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isSelected ? "#7c3aed" : "#d1d5db",
                      transition: "background 0.12s",
                    }}
                  />
                  <span
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {name}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
