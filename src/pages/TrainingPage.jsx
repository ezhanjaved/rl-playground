import "../styling/index.css";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import { TrainingInfoPanel } from "../editor/TrainingInfoPanel";
import TrainingInfoDesc from "../editor/TrainingInfoDesc";

export function TrainingInfoPage() {
  return (
    <div className="container">
      <Header />
      <SidebarV2 />
      <TrainingInfoDesc />
    </div>
  );
}
