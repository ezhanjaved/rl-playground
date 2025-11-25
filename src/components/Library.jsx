import React, { useState } from "react";
import "../styling/style.css";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import robotImg from '../assets/robot.png';

// Single draggable item (with image)
function DraggableItem({ id, imageSrc, payload }) {
  const { listeners, setNodeRef, attributes, transform } = useDraggable({ id, data: payload });
  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element">
      <img src={imageSrc} alt={id} className="lib-item-image" />
    </div>
  );
}

// Collapsible Section
const Section = ({ title, items }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: open ? "#e6e6e6" : "#ffffff" }}
        onClick={() => setOpen(!open)}
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>{title}</span>
          <span className="arrowIcon">{open ? <IoChevronUp /> : <IoChevronDown />}</span>
        </div>
      </button>

      {open && (
        <div className="gridWrapper">
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} imageSrc={item.image} payload={item.payload} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Library component
export default function Library() {
  const agents = [
    {
      id: "lib_agent_1",
      image: robotImg,
      payload: { tag: "agent", name: "Mage", assetRef: "agents/skelton/Skeleton_Mage.glb" },
    },
    {
      id: "lib_agent_2",
      image: robotImg,
      payload: { tag: "agent", name: "Minion", assetRef: "agents/skelton/Skeleton_Minion.glb" },
    },
    {
      id: "lib_agent_3",
      image: robotImg,
      payload: { tag: "agent", name: "Warrior", assetRef: "agents/skelton/Skeleton_Warrior.glb" },
    },
    {
      id: "lib_agent_4",
      image: robotImg,
      payload: { tag: "agent", name: "Rogue", assetRef: "agents/skelton/Skeleton_Rogue.glb" },
    },
  ];

  const nonStateObjects = [
    { id: "lib_non_state_obj_1", image: robotImg, payload: { isDecor: "true" } },
    { id: "lib_non_state_obj_2", image: robotImg, payload: { isDecor: "true" } },
    { id: "lib_non_state_obj_3", image: robotImg, payload: { isDecor: "true" } },
    { id: "lib_non_state_obj_4", image: robotImg, payload: { isDecor: "true" } },
    { id: "lib_non_state_obj_5", image: robotImg, payload: { isDecor: "true" } },
  ];

  return (
    <DndContext onDragEnd={(event) => console.log("Drag ended", event)}>
      <div className="library_main">
        <Section title="Agents" items={agents} />
        <Section title="Non State Objects" items={nonStateObjects} />
      </div>
    </DndContext>
  );
}
