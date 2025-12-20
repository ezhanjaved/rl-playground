import "../styling/App.css";
import { useRunTimeStore } from "../stores/useRunTimeStore";

export default function TrainingInfoDesc() {

  const selectedAgent = useRunTimeStore((s) => s.selectedAgent);
  const currentExperimentId = useRunTimeStore((s) => s.currentExperimentId);

  const qTable = useRunTimeStore((s) =>
    s.experiments?.[currentExperimentId]
      ?.agents?.[selectedAgent]
      ?.learningState?.qTable
  );

  if (!qTable) {
    return <div>No Q-Table available</div>;
  }

  return (
    <div className="training-info">
      <h3>Q-Table</h3>
      <pre>{JSON.stringify(qTable, null, 2)}</pre>
    </div>
  );
}