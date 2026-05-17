import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
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

      <style>{`
        .rtm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: rtm-fade-in 0.15s ease;
        }
        @keyframes rtm-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .rtm-modal {
          background: #fff;
          border-radius: 14px;
          width: 100%;
          max-width: 400px;
          margin: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
          animation: rtm-slide-up 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }
        @keyframes rtm-slide-up {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Header */
        .rtm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px 14px;
          border-bottom: 1px solid #f0f0f0;
        }
        .rtm-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rtm-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #ede9fe;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rtm-title {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          margin: 0;
          line-height: 1.3;
        }
        .rtm-subtitle {
          font-size: 12px;
          color: #9ca3af;
          margin: 2px 0 0;
        }
        .rtm-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .rtm-close-btn:hover {
          background: #f4f4f5;
          color: #374151;
        }

        /* Body */
        .rtm-body {
          padding: 18px 20px 4px;
        }
        .rtm-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .rtm-input-row {
          position: relative;
        }
        .rtm-input {
          width: 100%;
          box-sizing: border-box;
          height: 40px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 14px;
          color: #111;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: #fafafa;
        }
        .rtm-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          background: #fff;
        }
        .rtm-input--error {
          border-color: #ef4444;
        }
        .rtm-input--error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        /* Hide number input arrows */
        .rtm-input::-webkit-inner-spin-button,
        .rtm-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .rtm-input[type=number] { -moz-appearance: textfield; }

        .rtm-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .rtm-chip {
          height: 26px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-size: 11.5px;
          color: #6b7280;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          font-weight: 500;
        }
        .rtm-chip:hover:not(:disabled) {
          border-color: #7c3aed;
          color: #7c3aed;
          background: #f5f3ff;
        }
        .rtm-chip--active {
          border-color: #7c3aed !important;
          color: #7c3aed !important;
          background: #f5f3ff !important;
        }
        .rtm-chip:disabled { opacity: 0.5; cursor: not-allowed; }

        .rtm-error {
          font-size: 12px;
          color: #ef4444;
          margin: 8px 0 0;
        }

        /* Footer */
        .rtm-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 16px 20px 18px;
        }
        .rtm-btn {
          height: 36px;
          padding: 0 16px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s, opacity 0.15s;
        }
        .rtm-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .rtm-btn--cancel {
          background: #f4f4f5;
          color: #374151;
        }
        .rtm-btn--cancel:hover:not(:disabled) { background: #e4e4e7; }
        .rtm-btn--confirm {
          background: #7c3aed;
          color: #fff;
        }
        .rtm-btn--confirm:hover:not(:disabled) { background: #6d28d9; }

        /* Spinner */
        .rtm-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rtm-spin 0.6s linear infinite;
          display: inline-block;
        }
        @keyframes rtm-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
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
      connectCloudSocket(podUrl, (action, id) => {
        queueAction(action, id);
        clearPending(id);
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
    const training_id =
      typeof keyField === "function" ? keyField(item) : item[keyField];
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
                  {columns.map((col) => {
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
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <SkeletonTheme baseColor="#f4f4f5" highlightColor="#e4e4e7">
                    {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                      <tr key={rowIdx}>
                        {columns.map((col) => (
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
                          </>
                        )}
                      </tr>
                    ))}
                  </SkeletonTheme>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (actions ? 2 : 0)}
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
                        {columns.map((col) => {
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

      <style>{`
        .action-btn-retrain {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          color: #7c3aed;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
        }
        .action-btn-retrain:hover:not(.disabled):not(:disabled) {
          background: #f5f3ff;
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .action-btn-retrain.disabled,
        .action-btn-retrain:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      `}</style>
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
