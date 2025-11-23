import React, { useState } from "react";
import "../styling/style.css";
import { IoMoonOutline } from "react-icons/io5";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Section = ({ title }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{
          background: open ? "#e6e6e6" : "#ffffff",
        }}
        onClick={() => setOpen(!open)}
      >
        <IoMoonOutline />
        <div className="sectionTitle  ">
        <span>{title}</span>
        <span className="arrowIcon">
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </span>
        </div>
      </button>

      {open && (
        <div className="gridWrapper">
          <div className="gridItem"></div>
          <div className="gridItem"></div>
          <div className="gridItem"></div>
          <div className="gridItem"></div>
        </div>
      )}
    </div>
  );
};

const Library = () => {
  return (
    <div className="library">
      <h3>Create</h3>

      <Section title="Environments" />
      <Section title="Flows" />
      <Section title="Objects" />
    </div>
  );
};

export default Library;
