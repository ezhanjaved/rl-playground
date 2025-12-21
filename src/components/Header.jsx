import "../styling/style.css"
import { LuMessageCircleMore } from "react-icons/lu";
import { FaCode, FaPause, FaRegUserCircle, FaAddressBook, FaPlus, FaArrowRight, FaFileSignature } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useCanvasSetting } from "../stores/useCanvasSetting";
import { useGraphStore } from "../stores/useGraphStore";
import { useEffect, useState } from "react";

const Header = () => {
  const togglePlaying = useRunTimeStore((state) => state.togglePlaying);
  const playing = useRunTimeStore((state) => state.playing);
  const training = useRunTimeStore((s) => s.training);

  const toggleDebug = useCanvasSetting((state) => state.toggleDebug);
  const changeColor = useCanvasSetting((state) => state.changeColor);

  const graphs = useGraphStore((state) => state.graphs);
  const addGraph = useGraphStore((state) => state.addGraph);
  const nextGraph = useGraphStore((state) => state.nextGraph);
  const updateName = useGraphStore((state) => state.updateName);
  const activeGraphId = useGraphStore((state) => state.activeGraphId);
  
  const url = window.location.href;
  const [visibility, setVisibility] = useState(1);
  const [setting, setSetting] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const options = ["http://localhost:5173/", "http://localhost:5173/behavior-graph"]
    const index = options.indexOf(url);
    setVisibility(index+1);
  }, [])

  return (
    <header className='header'>
      <h1></h1>
      <div className='Window-Controls'>
        {training && (<span style={{fontSize: "22px", marginTop: "2px"}}>Training...</span>)}
        {setting && (
          <div className="setting-pop-up">
            <input value={name} type="text" placeholder="Enter Graph Name" onChange={(e) => setName(e.target.value)} />
            <button onClick={() => {
              updateName(activeGraphId, name);
              setSetting(null);
            }}>Update</button>
          </div>
        )}
        <span style={{display: visibility !== 2 ? "none" : "flex"}}>{graphs[activeGraphId]?.name || null}</span>
        <span ><LuMessageCircleMore /></span>
        <span ><FaRegUserCircle /></span>
        <span ><FaAddressBook /></span>
        <span style={{display: visibility !== 2 ? "none" : "flex", cursor: "pointer"}} onClick={() => setSetting(prev => !prev)}><FaFileSignature /></span>
        <span style={{ display: visibility !== 2 ? "none" : "flex", cursor: "pointer" }} onClick={() => addGraph()} ><FaPlus /></span>
        <span style={{ display: visibility !== 2 ? "none" : "flex", cursor: "pointer" }} onClick={() => nextGraph()} ><FaArrowRight /></span>
        <span style={{ display: visibility !== 1 ? "none" : "flex", cursor: "pointer" }} onClick={() => toggleDebug()} ><FaCode /></span>
        <span style={{ display: visibility !== 1 ? "none" : "flex", cursor: "pointer" }} onClick={() => {if (!training) togglePlaying();}} >{playing ? <FaPause /> : <FaPlay />}</span>
        <select style={{ display: visibility !== 1 ? "none" : "flex" }} name="color-picker" id="color-picker" onChange={(e) => changeColor(e.target.value)}>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
          <option value="peach">Peach</option>
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
        </select>
      </div>
    </header>
  )
}

export default Header