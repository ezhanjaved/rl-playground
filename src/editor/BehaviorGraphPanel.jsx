// React Flow graph UI
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";

export function BehaviorGraphPanel() {

    const eventNodes = [
        {id: "on-episode-start-node", image: null, payload: { data: { label: 'OnEpisodeStart' }, type: "OnEpisodeStartNode"}},
        {id: "on-step-node", image: null, payload: { data: { label: 'OnStep' }, type: "OnStepNode"}}
    ]

    const conditionalNodes = [
        {id: "in-radius-node", image: null, payload: { data: { label: 'WithInRadius', entityOne: null, entityTwo: null, radiusValue: null }, type: "InRadiusNode"}},
        {id: "last-action-is-node", image: null, payload: { data: { label: 'LastActionIs', agentCapability: null, entityAction: null, actionStatus: null }, type: "LastActionIsNode"}},
        {id: "state-equals-node", image: null, payload: { data: { label: 'StateEquals', entityCapability: null, entityState: null, StateStatus: null }, type: "StateEqualsToNode"}},
        {id: "compare-state-node", image: null, payload: { data: { label: 'CompareState', entityCapability: null, entityState: null, StateValue: null, Operator: null }, type: "CompareStateNode"}}
    ]

    const effectNodes = [
        {id: "end-episode-node", image: null, payload: { data: { label: 'EndEpisode' }, type: "EndEpisodeNode"}},
        {id: "add-reward-node", image: null, payload: { data: { label: 'AddReward', agentId: null, rewardValue: null }, type: "AddRewardNode"}},
        {id: "set-state-node", image: null, payload: { data: { label: 'SetState', entityCapability: null, entityState: null, stateValue: null }, type: "SetStateNode"}},
        {id: "request-action-node", image: null, payload: { data: { label: 'RequestAction' }, type: "RequestActionNode"}}
    ]

    return (
        <>
            <div className="library_main">
                <Section title="Event Nodes" items={eventNodes} />
                <Section title="Conditional Nodes" items={conditionalNodes} />
                <Section title="Effect Nodes" items={effectNodes} />
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
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element-bg">
                <div className="event-node">
                    <span>{payload?.data?.label}</span>
                </div>
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