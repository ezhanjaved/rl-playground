// Library + inspector (capabilities, state)
import "../styling/App.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DraggableItem({ id, label, payload }) {
    const { listeners, setNodeRef, attributes, transform } = useDraggable({ id, data: payload });
    const style = { transform: CSS.Translate.toString(transform), cursor: 'grab' }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="lib-single-element">
            <span>{label}</span>
            <div className="pill">Drag Me</div>
        </div>
    )
}

export default function EntitiesPanel() {
    return (
        <>
                <div className="library">
                    <div className="lib-components">
                        <h2>Agents</h2>
                        <div className="lib-list">
                            <DraggableItem
                                id="lib_agent_1"
                                label="Human"
                                payload={{ tag: "agent", assetRef: "girl.glb" }}
                            />
                        </div>
                    </div>
                </div>
        </>
    )
}