import "../styling/style.css"
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className='header'>
        <h1></h1>
        <div className='Window-Controls'>
            <span ><LuMessageCircleMore /></span>
            <span ><IoMdNotificationsOutline /></span>
            <span ><FaRegUserCircle /></span>
        </div>
    </header>
  )
}

export default Header