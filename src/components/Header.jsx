import "../styling/style.css"
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useEffect } from "react";

const Header = () => {
  const togglePlaying = useRunTimeStore((state) => state.togglePlaying);
  const playing = useRunTimeStore((state) => state.playing);
  useEffect(() => {
    console.log("Playing: " + playing);
  }, [playing])
  return (
    <header className='header'>
        <h1></h1>
        <div className='Window-Controls'>
            <span ><LuMessageCircleMore /></span>
            <span ><IoMdNotificationsOutline /></span>
            <span ><FaRegUserCircle /></span>
            <span style={{cursor: "pointer"}} onClick={() => togglePlaying()} ><FaPlay /></span>
        </div>
    </header>
  )
}

export default Header