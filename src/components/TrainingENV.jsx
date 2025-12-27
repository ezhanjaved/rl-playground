import "../styling/style.css";
import CanvasPad from "../scene/EditorCanvas";

const TrainingENV = () => {
  return (
    <main className="trainingEnvContainer">
      <h2 className="envTitle">Environment Canvas</h2>
      <p className="envSubtitle">Drag and drop items to build your RL environment</p>

      <div className="canvasBox">
         <CanvasPad />
      </div>
    </main>
  );
};

export default TrainingENV;
