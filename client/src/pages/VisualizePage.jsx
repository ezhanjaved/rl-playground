import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import TrainingMonitor from "../components/TrainingMonitor";

const VisualizePage = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <Header />
      <SidebarV2 />
      <TrainingMonitor trainingId={id} />
    </div>
  );
};

export default VisualizePage;
