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
                                id="lib_non_state_obj_1"
                                label="Tree"
                                payload={{ isDecor: "true", assetRef: "nature/Tree_2_A_Color1.gltf" }}
                            />
                            <DraggableItem
                                id="lib_non_state_obj_2"
                                label="Bare Tree"
                                payload={{ isDecor: "true", assetRef: "nature/Tree_4_A_Color1.gltf" }}
                            />
                            <DraggableItem
                                id="lib_non_state_obj_3"
                                label="Grass"
                                payload={{ isDecor: "true", assetRef: "nature/Grass_1_A_Color1.gltf" }}
                            />
                            <DraggableItem
                                id="lib_non_state_obj_4"
                                label="Bush"
                                payload={{ isDecor: "true", assetRef: "nature/Bush_4_B_Color1.gltf" }}
                            />

                            <DraggableItem
                                id="lib_non_state_obj_5"
                                label="Rock"
                                payload={{ isDecor: "true", assetRef: "nature/Rock_1_D_Color1.gltf" }}
                            />
                             <DraggableItem
                                id="lib_agent_2"
                                label="Animal"
                                payload={{ tag: "agent", assetRef: "lizard.glb" }}
                            />
                        </div>
                    </div>
                </div>
        </>
    )
}