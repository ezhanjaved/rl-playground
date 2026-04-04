import "../styling/index.css";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import ControlPanel from "../editor/AssignmentControl";
export default function ControlPanelPage() {
    return (
        <>
        <div className="container">
            <Header />
            <SidebarV2 />
            <ControlPanel />
        </div>
        </>
    )
}