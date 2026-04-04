import EntitiesPanel from "../editor/EntitiesPanel";
import { BehaviorGraphPanel } from "../editor/BehaviorGraphPanel";
import "../styling/style.css"
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidObjectsHorizontalLeft } from "react-icons/bi";
import { FaCircleNodes, FaListUl } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { FaShare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import  ControlPanel  from "../editor/AssignmentPanel";
import { TrainingInfoPanel } from "../editor/TrainingInfoPanel"
import RecordPanel from "../editor/RecordPanel";

const SidebarV2 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const icons = [
        { id: "home", icon: <IoHomeOutline />, path: "/", panelIdx: 0, label: "Home" },
        { id: "entities", icon: <BiSolidObjectsHorizontalLeft />, path: "/entities", panelIdx: 1, label: "Entities" },
        { id: "behavior", icon: <FaCircleNodes />, path: "/behavior-graph", panelIdx: 2, label: "Behavior" },
        { id: "settings", icon: <GrProjects />, path: "/control-panel", panelIdx: 3, label: "Settings" },
        { id: "records", icon: <FaListUl />, path: "/records", panelIdx: 4, label: "Records" },
        { id: "train-info", icon: <FaShare />, path: "/training-info", panelIdx: 5, label: "Info" },
    ];

    const [activePanel, setPanel] = useState(0);

    useEffect(() => {
        const path = location.pathname;
        const matchingIcon = icons.find(icon => icon.path === path);
        if (matchingIcon) {
            setPanel(matchingIcon.panelIdx);
        } else if (path.startsWith('/visualize')) {
            setPanel(4); // Keep records active when visualizing
        }
    }, [location.pathname]);

    const renderContent = () => {
        switch (activePanel) {
            case 0:
            case 1:
                return <EntitiesPanel />;
            case 2:
                return <BehaviorGraphPanel />;
            case 3:
                return <ControlPanel />;
            case 4:
                return <RecordPanel />;
            case 5:
                return <TrainingInfoPanel />;
            default:
                return <EntitiesPanel />;
        }
    };

    return (
        <aside className='sidebar'>
            <aside>
                {icons.map((item) => (
                    <span
                        key={item.id}
                        className={`icon ${activePanel === item.panelIdx ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                        title={item.label}
                    >
                        {item.icon}
                    </span>
                ))}
            </aside>
            <div className='sidebarContent'>
                <div className="homeIcon" onClick={() => navigate('/')}>
                    <span className='icon'><IoHomeOutline /></span>
                </div>
                {renderContent()}
            </div>
        </aside>
    )
}

export default SidebarV2
