import "../styling/index.css";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import ControlPanel from "../editor/AssignmentControl";
export default function ControlPanelPage() {
    return (
        <>
        <div className="container">
            <Header />
            <Sidebar />
            <ControlPanel />
        </div>
        </>
    )
}