// Library + inspector (capabilities, state)
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";

function DraggableItem({ id, payload }) {
    const { listeners, setNodeRef, attributes, transform } = useDraggable({ id, data: payload });
    const style = { transform: CSS.Translate.toString(transform), cursor: 'grab' }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element">
            <img alt={id} className="lib-item-image"></img>
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
                        <DraggableItem key={item.id} id={item.id} payload={item.payload} />
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
            payload: {tag: "agent", name: "Mage", assetRef: "agents/skelton/Skeleton_Mage.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 }},
        },
        {
            id: "lib_agent_2",
            label: "Minion",
            payload: { tag: "agent", name: "Minion", assetRef: "agents/skelton/Skeleton_Minion.glb" },
        },
        {
            id: "lib_agent_3",
            label: "Warrior",
            payload: { tag: "agent", name: "Warrior", assetRef: "agents/skelton/Skeleton_Warrior.glb" },
        },
        {
            id: "lib_agent_4",
            label:"Rogue",
            payload: { tag: "agent", name: "Rogue", assetRef: "agents/skelton/Skeleton_Rogue.glb" },
        },
    ];

    const nonStateObjects = [
        { id: "lib_non_state_obj_1", payload: { isDecor: "true", assetRef: "nature/Tree_2_A_Color1.gltf", collider: { shape: "capsule", h: 3, r: 0.6 } } },
        { id: "lib_non_state_obj_2", payload: { isDecor: "true" } },
        { id: "lib_non_state_obj_3", payload: { isDecor: "true" } },
        { id: "lib_non_state_obj_4", payload: { isDecor: "true" } },
        { id: "lib_non_state_obj_5", payload: { isDecor: "true" } },
    ];

    return (
        <>
            <div className="library_main">
                <Section title="Agents" items={agents} />
                <Section title="Non State Objects" items={nonStateObjects} />
                {/* <div className="lib-components">
                    <h2>Agents</h2>
                    <div className="lib-list">
                        <DraggableItem
                            id="lib_agent_1"
                            label="Mage"
                            payload={{ tag: "agent", name: "Mage", assetRef: "agents/skelton/Skeleton_Mage.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } }}
                        />
                        <DraggableItem
                            id="lib_agent_2"
                            label="Minion"
                            payload={{ tag: "agent", name: "Minion", assetRef: "agents/skelton/Skeleton_Minion.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } }}
                        />
                        <DraggableItem
                            id="lib_agent_3"
                            label="Warrior"
                            payload={{ tag: "agent", name: "Warrior", assetRef: "agents/skelton/Skeleton_Warrior.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } }}
                        />
                        <DraggableItem
                            id="lib_agent_4"
                            label="Rogue"
                            payload={{ tag: "agent", name: "Rogue", assetRef: "agents/skelton/Skeleton_Rogue.glb", animationRef: { 0: "agents/skelton/Rig_Medium_MovementBasic.glb", 1: "agents/skelton/Rig_Medium_General.glb" }, capabilities: ["Moveable"], isDeor: "false", collider: { shape: "capsule", h: 2, r: 0.30 } }}
                        />
                    </div>
                    <h2>Non State Objects</h2>
                    <div className="lib-list">
                        <DraggableItem
                            id="lib_non_state_obj_1"
                            label="Tree"
                            payload={{ isDecor: "true", assetRef: "nature/Tree_2_A_Color1.gltf", collider: { shape: "capsule", h: 3, r: 0.6 } }}
                        />
                        <DraggableItem
                            id="lib_non_state_obj_2"
                            label="Bare Tree"
                            payload={{ isDecor: "true", assetRef: "nature/Tree_4_A_Color1.gltf", collider: { shape: "capsule", h: 3, r: 0.8 } }}
                        />
                        <DraggableItem
                            id="lib_non_state_obj_3"
                            label="Grass"
                            payload={{ isDecor: "true", assetRef: "nature/Grass_1_A_Color1.gltf", collider: { shape: "capsule", h: 1, r: 0.1 } }}
                        />
                        <DraggableItem
                            id="lib_non_state_obj_4"
                            label="Bush"
                            payload={{ isDecor: "true", assetRef: "nature/Bush_4_B_Color1.gltf", collider: { shape: "capsule", h: 1, r: 0.1 } }}
                        />
                        <DraggableItem
                            id="lib_non_state_obj_5"
                            label="Rock"
                            payload={{ isDecor: "true", assetRef: "nature/Rock_1_D_Color1.gltf", collider: { shape: "capsule", h: 2, r: 0.4 } }}
                        />
                    </div>
                </div> */}
            </div>
        </>
    )
}