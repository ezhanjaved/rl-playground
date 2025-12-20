import "../styling/index.css";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import TrainingInfoDesc from "../editor/TrainingInfoDesc";
export function TrainingInfoPage() {
    return (
        <>
        <div className="container">
            <Header />
            <Sidebar />
            <TrainingInfoDesc />
        </div>
        </>
    )
}