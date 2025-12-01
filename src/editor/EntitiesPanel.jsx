// Library + inspector (capabilities, state)
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import lib1 from '../assets/lib1.png';
import lib2 from '../assets/lib2.png';
import lib3 from '../assets/lib3.png';
import lib4 from '../assets/lib4.png';
import pick1 from '../assets/pick1.png';
import pick2 from '../assets/pick2.png';
import pick3 from '../assets/pick3.png';
import pick4 from '../assets/pick4.png';
import agent1 from '../assets/agent1.png';
import agent2 from '../assets/agent2.png';
import agent3 from '../assets/agent3.png';
import agent4 from '../assets/agent4.png';

function DraggableItem({ id, payload, imageSrc }) {
    const { listeners, setNodeRef, attributes, transform } = useDraggable({ id, data: payload });
    const style = { transform: CSS.Translate.toString(transform), cursor: 'grab' }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element">
            <img src={imageSrc} alt={id} className="lib-item-image"></img>
        </div>
    )
}

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

export default function EntitiesPanel() {

    const agents = [
        {
            id: "lib_agent_1",
            label: "Mage",
            image: agent1,
            payload: { tag: "agent", name: "Mage", assetRef: "agents/skelton/Skeleton_Mage.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable", "Holder"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } },
        },
        {
            id: "lib_agent_2",
            label: "Minion",
            image: agent2,
            payload: { tag: "agent", name: "Minion", assetRef: "agents/skelton/Skeleton_Minion.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable", "Collector"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } },
        },
        {
            id: "lib_agent_3",
            label: "Warrior",
            image: agent3,
            payload: { tag: "agent", name: "Warrior", assetRef: "agents/skelton/Skeleton_Warrior.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable", "Holder"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } },
        },
        {
            id: "lib_agent_4",
            label: "Rogue",
            image: agent4,
            payload: { tag: "agent", name: "Rogue", assetRef: "agents/skelton/Skeleton_Rogue.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable", "Holder"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } },
        },
    ];

    const nonStateObjects = [
        { id: "lib_non_state_obj_1", image: lib1, payload: { isDecor: "true", assetRef: "nature/Tree_2_A_Color1.gltf", collider: { shape: "capsule", h: 3, r: 0.6 } } },
        { id: "lib_non_state_obj_2", image: lib2, payload: { isDecor: "true", assetRef: "nature/Tree_4_A_Color1.gltf", collider: { shape: "capsule", h: 3, r: 0.6 } } },
        { id: "lib_non_state_obj_3", image: lib3, payload: { isDecor: "true", assetRef: "nature/Bush_4_B_Color1.gltf", collider: { shape: "capsule", h: 1, r: 0.1 } } },
        { id: "lib_non_state_obj_4", image: lib4, payload: { isDecor: "true", assetRef: "nature/Rock_1_D_Color1.gltf", collider: { shape: "capsule", h: 2, r: 0.4 } } },
    ];

    const pickableItems = [
        { id: "lib_pickable_obj_1", image: pick1, payload: { isDecor: "false", isPickable: "true", isCollectable: false, assetRef: "agents/skelton/Skeleton_Blade.gltf", collider: { shape: "capsule", h: 1, r: 0.4 } } },
        { id: "lib_pickable_obj_2", image: pick2, payload: { isDecor: "false", isPickable: "true", isCollectable: "false", assetRef: "agents/skelton/Skeleton_Axe.gltf", collider: { shape: "capsule", h: 1, r: 0.4 } } },
        { id: "lib_pickable_obj_3", image: pick3, payload: { isDecor: "false", isPickable: "true", isCollectable: "false", assetRef: "agents/skelton/Skeleton_Shield_Large_A.gltf", collider: { shape: "capsule", h: 1, r: 0.4 } } },
        { id: "lib_pickable_obj_4", image: pick4, payload: { isDecor: "false", isPickable: "true", isCollectable: "false", assetRef: "agents/skelton/Skeleton_Staff.gltf", collider: { shape: "capsule", h: 1, r: 0.4 } } },
        { id: "lib_pickable_obj_5", image: null, payload: { isDecor: "false", isPickable: "true", isCollectable: "true", assetRef: "resources/key.gltf", collider: { shape: "capsule", h: 1, r: 0.2 } } },
        { id: "lib_pickable_obj_6", image: null, payload: { isDecor: "false", isPickable: "true", isCollectable: "true", assetRef: "resources/key.gltf", collider: { shape: "capsule", h: 1, r: 0.2 } } }
    ]

    return (
        <>
            <div className="library_main">
                <Section title="Agents" items={agents} />
                <Section title="Non State Objects" items={nonStateObjects} />
                <Section title="Pickable Items" items={pickableItems} />
            </div>
        </>
    )
}