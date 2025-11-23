import "../styling/style.css"
<<<<<<< Updated upstream
=======
import Library from './library'
import { IoHomeOutline } from "react-icons/io5";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <h2>Sidebar</h2>
=======
        <div className="homeIcon">
        <span className='icon'><IoHomeOutline /></span>
        </div>
        <Library/>
>>>>>>> Stashed changes
      </div>
    </aside>
  )
}

export default Sidebar