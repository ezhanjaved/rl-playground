import React from "react";
import "../styling/style.css";

const TrainingENV = () => {
  return (
    <main className="trainingEnvContainer">
      <h2 className="envTitle">Environment Canvas</h2>
      <p className="envSubtitle">Drag and drop items to build your RL environment</p>

      <div className="canvasBox">
        <p className="canvasPlaceholder">Drop items here to start building</p>
      </div>
    </main>
  );
};

export default TrainingENV;
