import { useMemo, useState, useCallback } from "react";
import { Play, Cpu, CheckSquare, Square } from "lucide-react";
import { useBackendWebSocket } from "../websocket/beWebsocket";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { connectCloudSocket } from "../websocket/ccWebsocket";
import { clearPending } from "../engine/runtime/controllers/ppoState";
import { queueAction } from "../engine/runtime/actionQueue";
import applyAction from "../engine/runtime/actuators/applyAction";
import { useSceneStore } from "../stores/useSceneStore";

export function InferenceRunner({
  title = "Inference Runner",
}) {
  const all_models = useRunTimeStore((state) => state.all_models); // { training_id: name }
  const setModelsList = useRunTimeStore((state) => state.setModelsList); // updates models_list ({ name: training_id })
  const {
    setShowLoadingModal,
    setModalStage,
    setModeltoLoading,
    setModeltoReady,
  } = useRunTimeStore.getState();

  const handleModelReady = useCallback(
    (podUrl) => {
      setModeltoReady(true);
      setModeltoLoading(false);
      connectCloudSocket(podUrl, (action, id, probs) => {
        const { inferenceMode, setWaitingForAction } =
          useRunTimeStore.getState();
        const { entities, updateEntityStat } = useSceneStore.getState();

        if (inferenceMode === "lockstep") {
          const agent = entities?.[id];
          if (!agent) {
            setWaitingForAction(agent.id, false);
            return;
          }
          updateEntityStat(agent.id, {
            last_action: action,
            probabilities: probs,
          });
          applyAction(action, agent, []);
          setWaitingForAction(agent.id, false);
          return;
        }

        if (inferenceMode === "on-cloud") {
          queueAction(action, id);
          clearPending(id);
        }
      });
    },
    [setModeltoReady],
  );

  const { connectSocket } = useBackendWebSocket(handleModelReady);

  const [selected, setSelected] = useState(() => new Set());
  const entries = useMemo(
    () => Object.entries(all_models ?? {}), // [training_id, name][]
    [all_models],
  );

  const toggleModel = (training_id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(training_id)) {
        next.delete(training_id);
      } else {
        next.add(training_id);
      }

      const nextModelsList = {};
      next.forEach((id) => {
        const name = all_models?.[id];
        if (name) nextModelsList[name] = id;
      });
      setModelsList(nextModelsList);
      return next;
    });
  };

  const allSelected = entries.length > 0 && selected.size === entries.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
      setModelsList({});
      return;
    }
    const next = new Set(entries.map(([training_id]) => training_id));
    const nextModelsList = {};
    entries.forEach(([training_id, name]) => {
      nextModelsList[name] = training_id;
    });
    setSelected(next);
    setModelsList(nextModelsList);
  };

  const handleStart = () => {
    connectSocket();
    setShowLoadingModal(true);
    setModalStage("connecting_to_backend");
  };

  return (
    <div className="rl-table-container">
      <div className="rl-table-card">
        <div className="rl-table-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: 0,
            }}
          >
            <h2 className="rl-table-title">{title}</h2>
            <span className="rl-table-summary">
              {selected.size} of {entries.length} model
              {entries.length === 1 ? "" : "s"} selected
            </span>
          </div>

          <button
            className="action-btn-eye"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "auto",
              padding: "8px 16px",
              opacity: selected.size === 0 ? 0.5 : 1,
              cursor: selected.size === 0 ? "not-allowed" : "pointer",
            }}
            onClick={handleStart}
            disabled={selected.size === 0}
            title={
              selected.size === 0
                ? "Select at least one model"
                : "Start Inference"
            }
          >
            <Play size={16} />
            Start Inference
          </button>
        </div>

        <div className="rl-scroll-area custom-scrollbar">
          <table className="rl-table">
            <thead className="rl-thead">
              <tr>
                <th
                  className="rl-th rl-action-cell"
                  onClick={toggleSelectAll}
                  style={{ cursor: "pointer" }}
                  title={allSelected ? "Deselect all" : "Select all"}
                >
                  {allSelected ? (
                    <CheckSquare size={16} />
                  ) : (
                    <Square size={16} />
                  )}
                </th>
                <th className="rl-th" style={{ textAlign: "left" }}>
                  Model Name
                </th>
                <th className="rl-th" style={{ textAlign: "left" }}>
                  Training ID
                </th>
              </tr>
            </thead>

            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "48px",
                      textAlign: "center",
                      color: "#9CA3AF",
                      fontSize: "14px",
                    }}
                  >
                    No models available for inference.
                  </td>
                </tr>
              ) : (
                entries.map(([training_id, name]) => {
                  const isSelected = selected.has(training_id);
                  return (
                    <tr
                      key={training_id}
                      className="rl-tr"
                      onClick={() => toggleModel(training_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="rl-td rl-action-cell">
                        {isSelected ? (
                          <CheckSquare size={16} />
                        ) : (
                          <Square size={16} />
                        )}
                      </td>
                      <td className="rl-td">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Cpu size={14} style={{ opacity: 0.6 }} />
                          {name}
                        </div>
                      </td>
                      <td
                        className="rl-td"
                        style={{ fontSize: "12px", opacity: 0.7 }}
                      >
                        {training_id}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InferenceRunner;
