import { useState, useCallback, useRef, useEffect } from "react";
import "../styling/table.css";
import { deleteModel } from "../export/deleteModel";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBackendWebSocket } from "../websocket/beWebsocket";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { connectCloudSocket } from "../websocket/ccWebsocket";
import { clearPending } from "../engine/runtime/controllers/ppoState";
import { queueAction } from "../engine/runtime/actionQueue";
import applyAction from "../engine/runtime/actuators/applyAction";
import { useSceneStore } from "../stores/useSceneStore";

function RetrainModal({ item, onClose, onConfirm }) {
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleConfirm = async () => {
    const parsed = parseInt(steps, 10);
    if (!steps || isNaN(parsed) || parsed <= 0) {
      setError("Please enter a valid number of timesteps.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onConfirm(item, parsed);
      onClose();
    } catch (err) {
      setError(err?.message || "Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConfirm();
  };

  return (
    <div
      className="rtm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="rtm-modal">
        {/* Header */}
        <div className="rtm-header">
          <div className="rtm-header-left">
            <div className="rtm-icon-wrap">
              <RotateCcw size={16} />
            </div>
            <div>
              <h3 className="rtm-title">Continue Training</h3>
              <p className="rtm-subtitle">
                {item.name ?? item.model_name ?? "Model"}
              </p>
            </div>
          </div>
          <button
            className="rtm-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="rtm-body">
          <label className="rtm-label" htmlFor="rtm-steps-input">
            Additional Timesteps
          </label>
          <div className="rtm-input-row">
            <input
              id="rtm-steps-input"
              ref={inputRef}
              type="number"
              min="1"
              step="10000"
              className={`rtm-input ${error ? "rtm-input--error" : ""}`}
              placeholder="e.g. 500000"
              value={steps}
              onChange={(e) => {
                setSteps(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
          </div>

          {/* Quick-select chips */}
          <div className="rtm-chips">
            {[100000, 500000, 1000000, 3000000].map((n) => (
              <button
                key={n}
                className={`rtm-chip ${steps === String(n) ? "rtm-chip--active" : ""}`}
                onClick={() => {
                  setSteps(String(n));
                  setError("");
                }}
                disabled={loading}
              >
                {n.toLocaleString()}
              </button>
            ))}
          </div>

          {error && <p className="rtm-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="rtm-footer">
          <button
            className="rtm-btn rtm-btn--cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="rtm-btn rtm-btn--confirm"
            onClick={handleConfirm}
            disabled={loading || !steps}
          >
            {loading ? (
              <span className="rtm-spinner" />
            ) : (
              <>
                <Zap size={14} />
                Start Retraining
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ item, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(item);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rtm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="rtm-modal dcm-modal">
        {/* Header */}
        <div className="rtm-header">
          <div className="rtm-header-left">
            <div className="rtm-icon-wrap dcm-icon-wrap">
              <Trash2 size={16} />
            </div>
            <div>
              <h3 className="rtm-title">Delete Model</h3>
              <p className="rtm-subtitle">
                {item.name ?? item.model_name ?? "Model"}
              </p>
            </div>
          </div>
          <button
            className="rtm-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="rtm-body dcm-body">
          <p className="dcm-message">
            Are you sure you want to delete this model? This action{" "}
            <strong>cannot be undone</strong>.
          </p>
        </div>

        {/* Footer */}
        <div className="rtm-footer">
          <button
            className="rtm-btn rtm-btn--cancel"
            onClick={onClose}
            disabled={loading}
          >
            No, Cancel
          </button>
          <button
            className="rtm-btn dcm-btn--delete"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="rtm-spinner dcm-spinner" />
            ) : (
              <>
                <Trash2 size={14} />
                Yes, Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const renderDefaultCell = (key, value) => {
  const k = key.toLowerCase();
  const v = String(value ?? "");
  const lowerV = v.toLowerCase();

  if (k === "active" || k === "is_active")
    return (
      <StatusBadge
        type="active"
        value={v === "1" || v === "true" || lowerV === "yes" ? "yes" : "no"}
      />
    );
  if (k === "status") {
    if (lowerV === "paid" || lowerV === "unpaid")
      return <StatusBadge type="status_invoice" value={v} />;
    return <StatusBadge type="status_account" value={v} />;
  }
  if (k === "onetime" || k === "is_onetime")
    return (
      <StatusBadge
        type="onetime"
        value={v === "1" || v === "true" || lowerV === "yes" ? "yes" : "no"}
      />
    );
  if (k === "completed")
    return (
      <StatusBadge
        type="completed"
        value={v === "1" || v === "true" || lowerV === "yes" ? "yes" : "no"}
      />
    );
  if (k === "available" || k === "is_available")
    return (
      <StatusBadge
        type="available"
        value={v === "1" || v === "true" || lowerV === "yes" ? "yes" : "no"}
      />
    );

  const categoricalKeys = [
    "category",
    "violations",
    "violation",
    "type",
    "tag",
    "role",
  ];
  if (
    categoricalKeys.includes(k) ||
    (k === "name" &&
      (lowerV.includes("highschool") ||
        lowerV.includes("middle") ||
        lowerV.includes("elementary") ||
        lowerV.includes("pre")))
  ) {
    return <StatusBadge type="category" value={v} />;
  }

  return v || "—";
};

export function Table({
  columns,
  data,
  keyField,
  emptyMessage = "No data.",
  loading = false,
  skeletonRows = 8,
  actions,
  title,
  totalResults,
  currentPage = 1,
  perPage = 15,
  headerExtra,
  onRetrain, // (item, additionalSteps) => Promise<void>  ← new prop
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [retrainItem, setRetrainItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Filter out final_reward column
  const filteredColumns = columns.filter(
    (col) => col.key.toLowerCase() !== "final_reward",
  );

  const {
    setShowLoadingModal,
    setModalStage,
    setModeltoLoading,
    setModeltoReady,
  } = useRunTimeStore.getState();

  const { entities } = useSceneStore.getState();

  const handleModelReady = useCallback(
    (podUrl) => {
      setModeltoReady(true);
      setModeltoLoading(false);
      connectCloudSocket(podUrl, (action, id, actionSeq) => {
        const { inferenceMode, setWaitingForAction } =
          useRunTimeStore.getState();

        if (inferenceMode === "lockstep") {
          const agent = entities[id];
          if (!agent) {
            setWaitingForAction(agent.id, false);
            return;
          }

          console.log("Lockstep action:", actionSeq, action);

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

  const getKey = (item) =>
    typeof keyField === "function" ? keyField(item) : String(item[keyField]);

  const badgeKeys = [
    "active",
    "is_active",
    "status",
    "onetime",
    "is_onetime",
    "completed",
    "available",
    "is_available",
    "category",
    "violations",
    "violation",
    "type",
    "tag",
    "role",
  ];

  const handleRetrain = async (item, additionalSteps) => {
    if (onRetrain) {
      return onRetrain(item, additionalSteps);
    }
    const training_id = item.training_id;
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/trainer/resume-training`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          training_id,
          additional_steps: additionalSteps,
        }),
      },
    );
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || `Server error ${res.status}`);
    }
  };

  const handleDelete = async (item) => {
    const training_id = item.training_id;
    await deleteModel(training_id);
  };

  const isTrainable = (item) => {
    const s = (item.status ?? "").toLowerCase();
    return s !== "training";
  };

  return (
    <>
      <div className="rl-table-container">
        <div className="rl-table-card">
          {(title || totalResults !== undefined || headerExtra) && (
            <div className="rl-table-header">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  minWidth: 0,
                }}
              >
                {title && <h2 className="rl-table-title">{title}</h2>}
                {totalResults !== undefined && (
                  <span className="rl-table-summary">
                    {totalResults} {title?.toLowerCase() ?? "items"} registered
                  </span>
                )}
              </div>
              {headerExtra && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {headerExtra}
                </div>
              )}
            </div>
          )}

          <div className="rl-scroll-area custom-scrollbar">
            <table className="rl-table">
              <thead className="rl-thead">
                <tr>
                  {filteredColumns.map((col) => {
                    const isBadge = badgeKeys.includes(col.key.toLowerCase());
                    return (
                      <th
                        key={col.key}
                        className="rl-th"
                        style={{
                          textAlign: isBadge ? "center" : "left",
                          ...(col.width ? { width: col.width } : {}),
                        }}
                      >
                        {col.label}
                      </th>
                    );
                  })}
                  {actions && <th className="rl-th rl-action-cell">Action</th>}
                  {actions && <th className="rl-th rl-action-cell">Retrain</th>}
                  {actions && <th className="rl-th rl-action-cell">Delete</th>}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <SkeletonTheme baseColor="#f4f4f5" highlightColor="#e4e4e7">
                    {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                      <tr key={rowIdx}>
                        {filteredColumns.map((col) => (
                          <td key={col.key} className="rl-td">
                            <Skeleton
                              height={14}
                              borderRadius={999}
                              width={`${rowIdx % 3 === 0 ? 75 : rowIdx % 3 === 1 ? 50 : 65}%`}
                            />
                          </td>
                        ))}
                        {actions && (
                          <>
                            <td className="rl-td rl-action-cell">
                              <Skeleton
                                height={28}
                                width={28}
                                borderRadius={8}
                              />
                            </td>
                            <td className="rl-td rl-action-cell">
                              <Skeleton
                                height={28}
                                width={28}
                                borderRadius={8}
                              />
                            </td>
                            <td className="rl-td rl-action-cell">
                              <Skeleton
                                height={28}
                                width={28}
                                borderRadius={8}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </SkeletonTheme>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={filteredColumns.length + (actions ? 3 : 0)}
                      style={{
                        padding: "48px",
                        textAlign: "center",
                        color: "#9CA3AF",
                        fontSize: "14px",
                      }}
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item) => {
                    const id = getKey(item);
                    const trainable = isTrainable(item);
                    return (
                      <tr key={id} className="rl-tr">
                        {filteredColumns.map((col) => {
                          const isBadge = badgeKeys.includes(
                            col.key.toLowerCase(),
                          );
                          return (
                            <td
                              key={col.key}
                              className="rl-td"
                              style={{ textAlign: isBadge ? "center" : "left" }}
                            >
                              <div
                                style={
                                  isBadge
                                    ? {
                                        display: "flex",
                                        justifyContent: "center",
                                      }
                                    : {}
                                }
                              >
                                {col.render ? (
                                  col.render(item)
                                ) : col.key === "status" ? (
                                  <div
                                    className={`status-pill status-${item.status}`}
                                  >
                                    <span className="status-dot"></span>
                                    {item.status}
                                  </div>
                                ) : (
                                  renderDefaultCell(col.key, item[col.key])
                                )}
                              </div>
                            </td>
                          );
                        })}

                        {actions && (
                          <td className="rl-td rl-action-cell">
                            <div className="rl-action-wrapper">
                              <button
                                className={`action-btn-eye ${!trainable ? "disabled" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (trainable) {
                                    connectSocket(item);
                                    setShowLoadingModal(true);
                                    setModalStage("connecting_to_backend");
                                  }
                                }}
                                title={
                                  !trainable
                                    ? "Model is still training"
                                    : "View Visualization"
                                }
                                disabled={!trainable}
                              >
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        )}

                        {actions && (
                          <td className="rl-td rl-action-cell">
                            <div className="rl-action-wrapper">
                              <button
                                className={`action-btn-retrain ${!trainable ? "disabled" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (trainable) setRetrainItem(item);
                                }}
                                title={
                                  !trainable
                                    ? "Model is still training"
                                    : "Continue Training"
                                }
                                disabled={!trainable}
                              >
                                <RotateCcw size={16} />
                              </button>
                            </div>
                          </td>
                        )}
                        {actions && (
                          <td className="rl-td rl-action-cell">
                            <div className="rl-action-wrapper">
                              <button
                                className="action-btn-delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteItem(item);
                                }}
                                title="Delete Model"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {retrainItem && (
        <RetrainModal
          item={retrainItem}
          onClose={() => setRetrainItem(null)}
          onConfirm={handleRetrain}
        />
      )}

      {deleteItem && (
        <DeleteConfirmModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

function getPageNumbers(currentPage, lastPage, maxVisible = 5) {
  if (lastPage <= maxVisible)
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(lastPage, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ meta, onPageChange }) {
  const { current_page, last_page } = meta;
  const pageNumbers = getPageNumbers(current_page, last_page);

  return (
    <div className="rl-pagination-container">
      <span className="rl-page-info">
        Page {current_page} of {last_page}
      </span>
      <div className="rl-page-controls">
        <button
          onClick={() => onPageChange(1)}
          disabled={current_page <= 1}
          aria-label="First page"
          className="rl-page-btn"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page <= 1}
          aria-label="Previous page"
          className="rl-page-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="rl-page-numbers">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`rl-page-number-btn ${current_page === pageNum ? "active" : ""}`}
            >
              {pageNum}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page >= last_page}
          aria-label="Next page"
          className="rl-page-btn"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => onPageChange(last_page)}
          disabled={current_page >= last_page}
          aria-label="Last page"
          className="rl-page-btn"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}
