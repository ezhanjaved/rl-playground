import Header from "../components/Header";
import { useParams } from "react-router-dom";
import SidebarV2 from "../components/SidebarV2";
import AnalysisPageContent from "../components/AnalysisPageContent";

export function AnalysisPage() {
  const { id } = useParams();
  return (
    <div className="container">
      <Header />
      <SidebarV2 />
      <AnalysisPageContent trainingId={id} />
    </div>
  );
}
