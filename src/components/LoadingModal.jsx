import { createPortal } from "react-dom";
import { useRunTimeStore } from "../stores/useRunTimeStore";
export const LoadingModal = () => {
  const { showLoadingModal, modalStage } = useRunTimeStore();
  if (!showLoadingModal) return null;

  const stageText = {
    connecting_to_backend: "Connecting to backend...",
    env_fetched_from_backend: "Environment is loaded...",
    connecting_to_cloud: "Loading model on cloud...",
    model_loaded_on_cloud: "Model is loaded on cloud computer...",
    cloud_connected: "You can start simulation.",
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "12px" }}>
          Preparing Visualization
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "16px" }}>
          {stageText[modalStage]}
        </p>
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "2px solid #111",
            borderTopColor: "transparent",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>,
    document.body,
  );
};
