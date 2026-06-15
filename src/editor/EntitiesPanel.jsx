// Library + inspector (capabilities, state)
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import lib1 from "../assets/lib1.png";
import lib2 from "../assets/lib2.png";
import lib3 from "../assets/lib3.png";
import lib4 from "../assets/lib4.png";
import pick1 from "../assets/pick1.png";
import pick2 from "../assets/pick2.png";
import pick3 from "../assets/pick3.png";
import pick4 from "../assets/pick4.png";
import pick5 from "../assets/pick5.png";
import pick6 from "../assets/pick6.png";
import agent1 from "../assets/agent1.png";
import agent2 from "../assets/agent2.png";
import agent3 from "../assets/agent3.png";
import agent4 from "../assets/agent4.png";
import agent5 from "../assets/agent5.png";
import agent6 from "../assets/agent6.png";
import agent7 from "../assets/agent7.png";
import agent8 from "../assets/agent8.png";
import target1 from "../assets/target_1.png";
import target2 from "../assets/target_2.png";
import Wall from "../assets/Wall.png";
import Rubble from "../assets/Rubble.png";
import ArchGate from "../assets/Arch_Gate.png";
import Fence from "../assets/Fence.png";
import YellowPumpkin from "../assets/Yellow_Pumpkin.png";
import OrangePumpkin from "../assets/Orange_Pumpkin.png";
import Football from "../assets/Football.png";
import Box from "../assets/Box.png";
import PineTree from "../assets/TreePine.png";
import GoalBlue from "../assets/Goal-Blue.png";
import GoalRed from "../assets/Goal-Red.png";
import BlueBarrier from "../assets/Blue-Barrier.png";
function DraggableItem({ id, payload, imageSrc, ...rest }) {
  const { listeners, setNodeRef, attributes, transform } = useDraggable({
    id,
    data: payload,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="lib-single-element"
      {...rest}
    >
      <img src={imageSrc} alt={id} className="lib-item-image"></img>
    </div>
  );
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
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>

      {open && (
        <div className="gridWrapper">
          {items.map((item) => {
            const tooltipLines = [
              item.payload.name || item.label || item.id,
              item.payload.capabilities
                ? `Capabilities: ${item.payload.capabilities.join(", ")}`
                : null,
              item.payload.tag ? `Tag: ${item.payload.tag}` : null,
            ].filter(Boolean);

            return (
              <DraggableItem
                key={item.id}
                id={item.id}
                imageSrc={item.image}
                payload={item.payload}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltipLines.join("\n")}
              />
            );
          })}
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
      payload: {
        tag: "agent",
        name: "Mage",
        assetRef: "agents/skelton/Skeleton_Mage.glb",
        animationRef: {
          0: "agents/skelton/Rig_Medium_MovementBasic.glb",
          1: "agents/skelton/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Finder"],
        behavior: [{ type: "Find", requiredCount: 1, status: false }],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_2",
      label: "Minion",
      image: agent2,
      payload: {
        tag: "agent",
        name: "Minion",
        assetRef: "agents/skelton/Skeleton_Minion.glb",
        animationRef: {
          0: "agents/skelton/Rig_Medium_MovementBasic.glb",
          1: "agents/skelton/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Collector", "Opener"],
        behavior: [
          { type: "Collect", requiredCount: 1, status: false },
          { type: "Open", requiredCount: 1, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_3",
      label: "Warrior",
      image: agent3,
      payload: {
        tag: "agent",
        name: "Warrior",
        assetRef: "agents/skelton/Skeleton_Warrior.glb",
        animationRef: {
          0: "agents/skelton/Rig_Medium_MovementBasic.glb",
          1: "agents/skelton/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Finder", "Holder"],
        behavior: [
          { type: "Holding", requiredCount: 1, status: false },
          { type: "Find", requiredCount: 1, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_4",
      label: "Rogue",
      image: agent4,
      payload: {
        tag: "agent",
        name: "Rogue",
        assetRef: "agents/skelton/Skeleton_Rogue.glb",
        animationRef: {
          0: "agents/skelton/Rig_Medium_MovementBasic.glb",
          1: "agents/skelton/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Navigator", "Finder"],
        behavior: [{ type: "Find", requiredCount: 1, status: false }],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_5",
      label: "Ranger",
      image: agent5,
      payload: {
        tag: "agent",
        name: "Ranger",
        assetRef: "agents/heroes/Ranger.glb",
        animationRef: {
          0: "agents/heroes/Rig_Medium_MovementBasic.glb",
          1: "agents/heroes/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Holder", "Depositor"],
        behavior: [
          { type: "Holding", requiredCount: 1, status: false },
          { type: "Deposit", requiredCount: 1, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_6",
      label: "Knight",
      image: agent6,
      payload: {
        tag: "agent",
        name: "Knight",
        assetRef: "agents/heroes/Knight.glb",
        animationRef: {
          0: "agents/heroes/Rig_Medium_MovementBasic.glb",
          1: "agents/heroes/Rig_Medium_General.glb",
        },
        capabilities: ["Moveable", "Collector", "Depositor"],
        behavior: [
          { type: "Collect", requiredCount: 2, status: false },
          { type: "Deposit", requiredCount: 2, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_7",
      label: "Barbarian",
      image: agent7,
      payload: {
        tag: "agent",
        name: "Barbarian",
        assetRef: "agents/heroes/Barbarian.glb",
        animationRef: {
          0: "agents/heroes/Rig_Medium_MovementBasic.glb",
          1: "agents/heroes/Rig_Medium_General.glb",
        },
        capabilities: [
          "Moveable",
          "Collector",
          "Depositor",
          "Destroyer",
          "Opener",
          "Finder",
          "Navigator",
        ],
        behavior: [
          { type: "Collect", requiredCount: 2, status: false },
          { type: "Deposit", requiredCount: 2, status: false },
          { type: "Destroy", requiredCount: 1, status: false },
          { type: "Open", requiredCount: 1, status: false },
          { type: "Find", requiredCount: 1, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
    {
      id: "lib_agent_8",
      label: "Rogue Human",
      image: agent8,
      payload: {
        tag: "agent",
        name: "Rogue Human",
        assetRef: "agents/heroes/Rogue.glb",
        animationRef: {
          0: "agents/heroes/Rig_Medium_MovementBasic.glb",
          1: "agents/heroes/Rig_Medium_General.glb",
        },
        capabilities: [
          "Moveable",
          "Holder",
          "Depositor",
          "Destroyer",
          "Opener",
          "Finder",
          "Navigator",
        ],
        behavior: [
          { type: "Holding", requiredCount: 1, status: false },
          { type: "Deposit", requiredCount: 1, status: false },
          { type: "Open", requiredCount: 1, status: false },
          { type: "Destroy", requiredCount: 2, status: false },
          { type: "Find", requiredCount: 1, status: false },
        ],
        isDecor: false,
        collider: { shape: "capsule", h: 2, r: 0.3 },
      },
    },
  ];

  const destroyableObjects = [
    {
      id: "lib_destroy_obj_1",
      image: OrangePumpkin,
      payload: {
        name: "pumpkin_orange",
        tag: "destroyable",
        isDestroyable: "true",
        isDecor: "true",
        assetRef: "resources/pumpkin_orange_jackolantern.gltf",
        collider: { shape: "box", w: 1.5, h: 0.6, d: 1.0 },
        state: { isDestroyed: false },
      },
    },
    {
      id: "lib_destroy_obj_2",
      image: YellowPumpkin,
      payload: {
        name: "pumpkin_yellow",
        tag: "destroyable",
        isDestroyable: "true",
        isDecor: "true",
        assetRef: "resources/pumpkin_yellow_jackolantern.gltf",
        collider: { shape: "box", w: 1.5, h: 0.6, d: 1.0 },
        state: { isDestroyed: false },
      },
    },
  ];

  const StateObjects = [
    {
      id: "lib_state_obj_1",
      image: ArchGate,
      payload: {
        name: "arch_gate",
        tag: "static-obj",
        isGate: "true",
        isDecor: "true",
        assetRef: "resources/arch_gate.gltf",
        collider: { shape: "box", w: 4.5, h: 2.5, d: 1.0 },
        state: { isOpen: false },
      },
    },
    {
      id: "lib_state_obj_2",
      image: Box,
      payload: {
        name: "arch_gate",
        tag: "push-obj",
        isGate: "true",
        isDecor: "true",
        assetRef: "resources/box_large.gltf",
        collider: { shape: "box", w: 2.0, h: 1.5, d: 1.5 },
        state: { isOpen: false },
      },
    },
    {
      id: "lib_state_obj_3",
      image: Football,
      payload: {
        name: "arch_gate",
        tag: "ball",
        isGate: "true",
        isDecor: "true",
        assetRef: "dynamic/football.gltf",
        collider: { shape: "ball", r: 0.25 },
        state: { isOpen: false },
      },
    },
    {
      id: "lib_state_obj_4",
      image: GoalRed,
      payload: {
        name: "arch_gate",
        tag: "post",
        isGate: "true",
        isDecor: "true",
        isGoalPost: "true",
        goalId: "red",
        assetRef: "resources/arch_red.gltf",
        collider: { shape: "box", w: 2.2, h: 0.05, d: 1.0 },
        state: { isOpen: false },
      },
    },
    {
      id: "lib_state_obj_5",
      image: GoalBlue,
      payload: {
        name: "arch_gate",
        tag: "post",
        isGate: "true",
        isDecor: "true",
        isGoalPost: "true",
        goalId: "blue",
        assetRef: "resources/arch_blue.gltf",
        collider: { shape: "box", w: 2.2, h: 0.05, d: 1.0 },
        state: { isOpen: false },
      },
    },
  ];

  const nonStateObjects = [
    {
      id: "lib_non_state_obj_1",
      image: lib1,
      payload: {
        name: "Tall Tree",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/Tree_2_A_Color1.gltf",
        collider: { shape: "capsule", h: 3, r: 0.6 },
      },
    },
    {
      id: "lib_non_state_obj_2",
      image: lib2,
      payload: {
        name: "Wide Tree",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/Tree_4_A_Color1.gltf",
        collider: { shape: "capsule", h: 3, r: 0.6 },
      },
    },
    {
      id: "lib_non_state_obj_3",
      image: PineTree,
      payload: {
        name: "Pine Tree",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/tree_pine_orange_large.gltf",
        collider: { shape: "capsule", h: 4.0, r: 1.2 },
      },
    },
    {
      id: "lib_non_state_obj_4",
      image: lib3,
      payload: {
        name: "Bush",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/Bush_4_B_Color1.gltf",
        collider: { shape: "capsule", h: 1, r: 0.1 },
      },
    },
    {
      id: "lib_non_state_obj_5",
      image: lib4,
      payload: {
        name: "Rock",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/Rock_1_D_Color1.gltf",
        collider: { shape: "capsule", h: 2, r: 0.4 },
      },
    },
    {
      id: "lib_non_state_obj_6",
      image: Wall,
      payload: {
        name: "Wall Gated",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/wall_gated.gltf",
        collider: { shape: "box", w: 3.5, h: 2.5, d: 0.6 },
      },
    },
    {
      id: "lib_non_state_obj_7",
      image: Rubble,
      payload: {
        name: "Rubble",
        tag: "non_state",
        isDecor: "true",
        assetRef: "nature/rubble_large.gltf",
        collider: { shape: "box", w: 6.5, h: 0.6, d: 2.5 },
      },
    },
    {
      id: "lib_non_state_obj_8",
      image: Fence,
      payload: {
        name: "Fence",
        tag: "non_state",
        isDecor: "true",
        assetRef: "resources/fence.gltf",
        collider: { shape: "box", w: 4.0, h: 1.5, d: 1.0 },
      },
    },
    {
      id: "lib_non_state_obj_9",
      image: BlueBarrier,
      payload: {
        name: "Blue Barrier",
        tag: "non_state",
        isDecor: "true",
        assetRef: "resources/barrier_4x1x1_blue.gltf",
        collider: { shape: "box", w: 4.0, h: 1.0, d: 1.0 },
      },
    },
  ];

  const pickableItems = [
    {
      id: "lib_pickable_obj_1",
      image: pick1,
      payload: {
        name: "Blade",
        tag: "Pickable Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "false",
        assetRef: "agents/skelton/Skeleton_Blade.gltf",
        collider: { shape: "capsule", h: 1, r: 0.4 },
        targetStat: { radius: 2 },
      },
    },
    {
      id: "lib_pickable_obj_2",
      image: pick2,
      payload: {
        name: "Axe",
        tag: "Pickable Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "false",
        assetRef: "agents/skelton/Skeleton_Axe.gltf",
        collider: { shape: "capsule", h: 1, r: 0.4 },
        targetStat: { radius: 2 },
      },
    },
    {
      id: "lib_pickable_obj_3",
      image: pick3,
      payload: {
        name: "Shield",
        tag: "Pickable Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "false",
        assetRef: "agents/skelton/Skeleton_Shield_Large_A.gltf",
        collider: { shape: "capsule", h: 1, r: 0.4 },
        targetStat: { radius: 2 },
      },
    },
    {
      id: "lib_pickable_obj_4",
      image: pick4,
      payload: {
        name: "Staff",
        tag: "Pickable Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "false",
        assetRef: "agents/skelton/Skeleton_Staff.gltf",
        collider: { shape: "capsule", h: 1, r: 0.4 },
        targetStat: { radius: 2 },
      },
    },
    {
      id: "lib_pickable_obj_5",
      image: pick5,
      payload: {
        name: "Key",
        tag: "Collectible Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "true",
        isKey: "true",
        assetRef: "resources/key.gltf",
        collider: { shape: "capsule", h: 1, r: 0.2 },
        targetStat: { radius: 1 },
      },
    },
    {
      id: "lib_pickable_obj_6",
      image: pick6,
      payload: {
        name: "Coin",
        tag: "Collectible Object",
        isDecor: "false",
        isPickable: "true",
        isCollectable: "true",
        assetRef: "resources/coin.gltf",
        collider: { shape: "capsule", h: 1, r: 0.2 },
        targetStat: { radius: 1 },
      },
    },
  ];

  const targetItems = [
    {
      id: "lib_target_obj_1",
      image: target1,
      payload: {
        name: "Chest",
        tag: "target",
        isDecor: "false",
        isPickable: false,
        isCollectable: false,
        isTarget: "true",
        assetRef: "resources/chest_gold.gltf",
        collider: { shape: "sphere", h: 2.5, r: 0.5 },
        targetStat: { radius: 2 },
      },
    },
    {
      id: "lib_target_obj_2",
      image: target2,
      payload: {
        name: "Floor",
        tag: "deposit",
        isDecor: "false",
        isPickable: false,
        isCollectable: false,
        isDeposit: "true",
        isTarget: "false",
        assetRef: "resources/floor_wood_large_dark.gltf",
        collider: { shape: "sphere", h: 2.5, r: 0.5 },
        targetStat: { radius: 0 },
      },
    },
  ];

  return (
    <>
      <div className="library_main">
        <Section title="Agents" items={agents} />
        <Section title="Static Obstacles" items={nonStateObjects} />
        <Section title="Dyanmic Obstacles" items={StateObjects} />
        <Section title="Pickable Items" items={pickableItems} />
        <Section title="Destroyable Items" items={destroyableObjects} />
        <Section title="Target Items" items={targetItems} />
      </div>
      <Tooltip
        id="my-tooltip"
        style={{ whiteSpace: "pre-line", zIndex: 100 }}
      />
    </>
  );
}
