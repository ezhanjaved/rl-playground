import "../styling/index.css";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import { AssignmentControl } from "../editor/AssignmentControl";
export default function ControlPanelPage() {
    return (
        <>
        <div className="container">
            <Header />
            <Sidebar />
            <AssignmentControl />
        </div>
        </>
    )
}