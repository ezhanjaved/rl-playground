// React Flow graph UI
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";

export function BehaviorGraphPanel() {
  const eventNodes = [
    {
      id: "on-episode-start-node",
      payload: {
        data: { label: "OnEpisodeStart" },
        type: "OnEpisodeStartNode",
      },
    },
    {
      id: "on-step-node",
      payload: { data: { label: "OnStep" }, type: "OnStepNode" },
    },
  ];

  const conditionalNodes = [
    {
      id: "in-radius-node",
      payload: {
        data: { label: "WithInRadius", entityOne: null, entityTwo: null },
        type: "InRadiusNode",
      },
    },
    {
      id: "is-distance-less-node",
      payload: {
        data: { label: "IsDistanceLess", entityOne: null, entityTwo: null },
        type: "IsDistanceLessNode",
      },
    },
    {
      id: "is-distance-more-node",
      payload: {
        data: { label: "IsDistanceMore", entityOne: null, entityTwo: null },
        type: "IsDistanceMoreNode",
      },
    },
    {
      id: "is-delta-x-less-node",
      payload: {
        data: { label: "IsDeltaXLess", entityOne: null, entityTwo: null },
        type: "IsDeltaXLessNode",
      },
    },
    {
      id: "is-delta-z-pos-node",
      payload: {
        data: { label: "IsDeltaZPos", entityOne: null, entityTwo: null },
        type: "IsDeltaZPosNode",
      },
    },
    {
      id: "last-action-is-node",
      payload: {
        data: {
          label: "LastActionIs",
          agentCapability: null,
          entityAction: null,
          actionStatus: null,
        },
        type: "LastActionIsNode",
      },
    },
    {
      id: "state-equals-node",
      payload: {
        data: {
          label: "StateEquals",
          entityCapability: null,
          entityState: null,
          StateStatus: null,
        },
        type: "StateEqualsToNode",
      },
    },
    {
      id: "compare-state-node",
      payload: {
        data: {
          label: "CompareState",
          entityCapability: null,
          entityState: null,
          StateValue: null,
          Operator: null,
        },
        type: "CompareStateNode",
      },
    },
    {
      id: "num-obs-value-node",
      payload: {
        data: {
          label: "NumObsNode",
          obsKey: null,
          mode: null,
          Operator: null,
          ObsValue: null,
        },
        type: "NumericObsNode",
      },
    },
    {
      id: "bool-obs-value-node",
      payload: {
        data: {
          label: "BoolObsNode",
          obsKey: null,
          mode: null,
          status: null,
        },
        type: "BoolObsNode",
      },
    },
    {
      id: "is-obstacle-in-path",
      payload: {
        data: {
          label: "IsObstacleIn",
          direction: null,
        },
        type: "IsObstacleInPath",
      },
    },
  ];

  const effectNodes = [
    {
      id: "end-episode-node",
      payload: { data: { label: "EndEpisode" }, type: "EndEpisodeNode" },
    },
    {
      id: "add-reward-node",
      payload: {
        data: { label: "AddReward", agentId: null, rewardValue: null },
        type: "AddRewardNode",
      },
    },
    {
      id: "truncate-episode-node",
      payload: {
        data: { label: "TruncateEp" },
        type: "TruncateEpisodeNode",
      },
    },
  ];

  return (
    <>
      <div className="library_main">
        <Section title="Event Nodes" items={eventNodes} />
        <Section title="Conditional Nodes" items={conditionalNodes} />
        <Section title="Effect Nodes" items={effectNodes} />
      </div>
    </>
  );
}

const Section = ({ title, items }) => {
  const [open, setOpen] = useState(true);

  function DraggableItem({ id, payload }) {
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
        className="lib-single-element-bg"
      >
        <div className="event-node">
          <span>{payload?.data?.label}</span>
        </div>
      </div>
    );
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
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
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
