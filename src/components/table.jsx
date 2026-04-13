import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBackendWebSocket } from "../websocket/beWebsocket";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { connectCloudSocket } from "../websocket/ccWebsocket";
import applyAction from "../engine/runtime/actuators/applyAction";

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
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const setModeltoReady = useRunTimeStore((s) => s.setModeltoReady);

  // Stable callback — won't go stale on re-renders
  // Receives pod_url from the backend READY message
  const handleModelReady = useCallback(
    (podUrl) => {
      setModeltoReady(); //flag model to ready
      connectCloudSocket(podUrl, (action) => {
        //connect to cloud computer
        applyAction(action);
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

  return (
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
                        <td className="rl-td rl-action-cell">
                          <Skeleton height={28} width={28} borderRadius={8} />
                        </td>
                      )}
                    </tr>
                  ))}
                </SkeletonTheme>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
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
                                  className={`status-pill status-${item.status.toLowerCase()}`}
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
                              className={`action-btn-eye ${item.status === "Training" ? "disabled" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.status !== "training") {
                                  connectSocket(item);
                                }
                              }}
                              title={
                                item.status === "training"
                                  ? "Model is still training"
                                  : "View Visualization"
                              }
                              disabled={item.status === "training"}
                            >
                              <Eye size={18} />
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
  );
}

function getPageNumbers(currentPage, lastPage, maxVisible = 5) {
  if (lastPage <= maxVisible) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(lastPage, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
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
