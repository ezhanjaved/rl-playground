import React from "react";
import "../styling/style.css";
import EditorCanvas from "../scene/EditorCanvas";

const TrainingENV = () => {
  return (
    <main className="trainingEnvContainer">
      <h2 className="envTitle">Environment Canvas</h2>
      <p className="envSubtitle">Drag and drop items to build your RL environment</p>

      <div className="canvasBox">
         <EditorCanvas />
      </div>
    </main>
  );
};

export default TrainingENV;
