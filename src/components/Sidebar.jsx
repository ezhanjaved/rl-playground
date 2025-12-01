import EntitiesPanel from "../editor/EntitiesPanel";
import { BehaviorGraphPanel } from "../editor/BehaviorGraphPanel";
import "../styling/style.css"
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <aside>
      <span className='icon'><IoHomeOutline /></span>
      <span className='icon'><IoHomeOutline /></span>
      <span className='icon'><IoHomeOutline /></span>
      <span className='icon'><IoHomeOutline /></span>
      <span className='icon'><IoHomeOutline /></span>
      </aside>
      <div className='sidebarContent'>
        <div className="homeIcon">
        <span className='icon'><IoHomeOutline /></span>
        </div>
        {/* <EntitiesPanel /> */}
        <BehaviorGraphPanel />
      </div>
    </aside>
  )
}

export default Sidebar