// React Flow graph UI
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";

export function BehaviorGraphPanel() {

    const eventNodes = [
        {id: "event_node_1", image: null, payload: {id: 'n1', position: { x: 0, y: 2 }, data: { label: 'Node 1' }, type: 'input'}},
        {id: "event_node_2", image: null, payload: {id: 'n2', position: { x: 250, y: 2 }, data: { label: 'Node 2' }, type: 'input'}},
    ]

    return (
        <>
            <div className="library_main">
                <Section title="Event Nodes" items={eventNodes} />
            </div>
        </>
    )
}

const Section = ({ title, items }) => {

    const [open, setOpen] = useState(true);

    function DraggableItem({ id, payload, imageSrc }) {
        const { listeners, setNodeRef, attributes, transform } = useDraggable({ id, data: payload });
        const style = { transform: CSS.Translate.toString(transform), cursor: 'grab' }
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element">
                <img src={imageSrc} alt={id} className="lib-item-image"></img>
            </div>
        )
    }

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