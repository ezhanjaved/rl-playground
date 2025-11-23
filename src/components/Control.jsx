import React, { useState } from "react";
import "../styling/style.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IoSettingsOutline, IoHomeOutline } from "react-icons/io5";

const Control = () => {
  const [paramOpen, setParamOpen] = useState(true);

  return (
    <aside className="control">

      {/* Header */}
      <div className="controlHeader">
        <div className="homeIcon">
        <span className="icon"><IoHomeOutline/></span>
        </div>
        <div className="controlTitle">
          <h2>Controls</h2>
          <p>Configure and train your model</p>
          </div>
    
        
      </div>

      {/* Select Algorithm (Dropdown) */}
      <div className="selectAlgoWrapper">
  <IoHomeOutline className="selectAlgoIcon" />

   <select className="selectAlgoInput" defaultValue="">
    <option value="" disabled hidden>
      Select Algorithm
    </option>
    <option value="DQN">DQN</option>
    <option value="DDQN">DDQN</option>
    <option value="A3C">A3C</option>
    <option value="PPO">PPO</option>
  </select>
</div>

      {/* Simulations */}
      <div className="simHeader">
        <IoHomeOutline />
        <span>Simulations</span>
      </div>

      <div className="simRow">
        <span>Auto Simulate</span>
        <input type="checkbox" className="toggle" />
      </div>

      <div className="simRow">
        <span>Visualize training</span>
        <input type="checkbox" className="toggle" />
      </div>

      <div className="simRow">
        <span>Real-time update</span>
        <input type="checkbox" className="toggle" />
      </div>

      {/* Parameters */}
      <button
        className="sectionHeader"
        onClick={() => setParamOpen(!paramOpen)}
        style={{ marginTop: "20px" }}
      >
        <IoSettingsOutline />
        <span className="sectionTitle">Parameters</span>
        <span className="arrowIcon">
        {paramOpen ? <IoChevronUp /> : <IoChevronDown />}
      </span>
      </button>

      {paramOpen && (
        <div className="paramContent">
          <label>Episodes</label>
          <input className="inputBox" defaultValue={1000} />

          <label>Learning rate</label>
          <input className="inputBox" defaultValue={0.001} />

          <label>Discount Factor (γ)</label>
          <input className="inputBox" defaultValue={0.99} />
        </div>
      )}

      {/* Train Button */}
      <button className="trainButton">Train Model</button>
    </aside>
  );
};

export default Control;
