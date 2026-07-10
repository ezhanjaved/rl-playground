import EntitiesPanel from "../editor/EntitiesPanel";
import { BehaviorGraphPanel } from "../editor/BehaviorGraphPanel";
import "../styling/style.css"
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidObjectsHorizontalLeft } from "react-icons/bi";
import { FaCircleNodes } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { FaShare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  ControlPanel  from "../editor/AssignmentPanel";
import { TrainingInfoPanel } from "../editor/TrainingInfoPanel"

const Sidebar = () => {
  const [activePanel, setPanel] = useState(0); //0 is for Entity and 1 is for Behavior
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const options = ["http://localhost:5173/", "http://localhost:5173/behavior-graph", "http://localhost:5173/control-panel"]
    const index = options.indexOf(url);
    setPanel(index);
  }, [])

  const icons = [
    { id: "home", icon: <IoHomeOutline />, page: "http://localhost:5173/" },
    { id: "entities", icon: <BiSolidObjectsHorizontalLeft />, page: "http://localhost:5173/" },
    { id: "behavior", icon: <FaCircleNodes />, page: "http://localhost:5173/behavior-graph" },
    { id: "settings", icon: <GrProjects />, page: "http://localhost:5173/control-panel" },
    { id: "about", icon: <FaShare />, page: "http://localhost:5173/training-info" },
  ];
  const renderContent = () => {
    switch (activePanel) {
      case 0:
        return <EntitiesPanel />;
      case 1:
        return <BehaviorGraphPanel />;
      case 2:
        return <ControlPanel />;
      default:
        return <TrainingInfoPanel />;
    }
  };

  return (
    <aside className='sidebar'>
      <aside>
        {icons.map(item => (
          <span
            key={item.id}
            className="icon"
            onClick={() => navigate(item.page)}
          >
            {item.icon}
          </span>
        ))}
      </aside>
      <div className='sidebarContent'>
        <div className="homeIcon">
          <span className='icon'><IoHomeOutline /></span>
        </div>
        {renderContent()}
      </div>
    </aside>
  )
}

export default Sidebar