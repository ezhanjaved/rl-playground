import EntitiesPanel from "../editor/EntitiesPanel";
import { BehaviorGraphPanel } from "../editor/BehaviorGraphPanel";
import "../styling/style.css"
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidObjectsHorizontalLeft } from "react-icons/bi";
import { FaCircleNodes } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { FaShare } from "react-icons/fa";
import { useState } from "react";


const Sidebar = ({ setCurrentPage }) => {
  const [active, setActive] = useState("home");
  const icons = [
    { id: "home", icon: <IoHomeOutline />, page: "environment"  },
    { id: "entities", icon: <BiSolidObjectsHorizontalLeft />, page: "environment"  },
    { id: "behavior", icon: <FaCircleNodes />, page: "behavior"  },
    { id: "settings", icon: <GrProjects />, page: "environment"  },
    { id: "about", icon: <FaShare />, page: "behavior"  },
  ];
  const renderContent = () => {
    switch (active) {
      case "home":
        return <EntitiesPanel />;
      case "entities":
        return <EntitiesPanel />;
      case "behavior":
        return <BehaviorGraphPanel />;
      case "settings":
        return <EntitiesPanel />;
      case "about":
        return <BehaviorGraphPanel />;
      default:
        return null;
    }
  };
 const handleClick = (item) => {
    setActive(item.id);
    setCurrentPage(item.page);
  };
  return (
    <aside className='sidebar'>
      <aside>
      {icons.map(item => (
          <span
            key={item.id}
            className={`icon ${active === item.id ? "active" : ""}`}
            onClick={() => handleClick(item)}
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