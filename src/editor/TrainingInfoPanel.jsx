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
        <div className="gridWrapper">
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
                  className={`agentRow ${isSelected ? "activeAgent" : ""}`}
                  onClick={() => setAgent(agentId)}
                  title={name}
                >
                  {name}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};