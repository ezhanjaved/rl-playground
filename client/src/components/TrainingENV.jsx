import "../styling/style.css";
import CanvasPad from "../scene/EditorCanvas";

const TrainingENV = ({ isFullscreen, onToggleFullscreen }) => {
  return (
    <main className="trainingEnvContainer">
      {!isFullscreen && (
        <>
          <h2 className="envTitle">Environment Canvas</h2>
          <p className="envSubtitle">Drag and drop items to build your RL environment</p>
        </>
      )}

      <div className="canvasBox">
        {!isFullscreen && (
          <button className="canvas-maximize-btn" onClick={onToggleFullscreen} title="Fullscreen">
            ⛶
          </button>
        )}
        <CanvasPad isFullscreen={isFullscreen} />
      </div>
    </main>
  );
};

export default TrainingENV;
