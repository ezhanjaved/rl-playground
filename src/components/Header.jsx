import "../styling/style.css"
import { LuMessageCircleMore } from "react-icons/lu";
import { FaCode, FaPause, FaRegUserCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useCanvasSetting } from "../stores/useCanvasSetting";

const Header = () => {
  const togglePlaying = useRunTimeStore((state) => state.togglePlaying);
  const playing = useRunTimeStore((state) => state.playing);
  const toggleDebug = useCanvasSetting((state) => state.toggleDebug);
  const changeColor = useCanvasSetting((state) => state.changeColor);

  return (
    <header className='header'>
        <h1></h1>
        <div className='Window-Controls'>
            <span ><LuMessageCircleMore /></span>
            <span style={{cursor: "pointer"}} onClick={() => toggleDebug()} ><FaCode /></span>
            <span ><FaRegUserCircle /></span>
            <span style={{cursor: "pointer"}} onClick={() => togglePlaying()} >{playing ? <FaPause /> : <FaPlay />}</span>
            <select name="color-picker" id="color-picker" onChange={(e) => changeColor(e.target.value)}>
              <option value="pink">Pink</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
              <option value="peach">Peach</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </select>
        </div>
    </header>
  )
}

export default Header