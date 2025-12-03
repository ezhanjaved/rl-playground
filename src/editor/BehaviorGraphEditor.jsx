// BehaviorGraphEditor.jsx
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, BackgroundVariant, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraphStore } from "../stores/useGraphStore.js";
import { useCallback, useEffect } from "react";
import { OnStepNode, OnEpisodeStartNode } from "./nodes/eventNodes.jsx";
import { InRadiusNode, LastActionIsNode, StateEqualsToNode, CompareStateNode } from "./nodes/conditionalNodes.jsx";
import { EndEpisodeNode, AddRewardNode, SetStateNode, RequestAction } from "./nodes/effectNodes.jsx";

export function BehaviorGraphEditor() {
    const activeGraphId = useGraphStore((s) => s.activeGraphId);
    const graphs = useGraphStore((s) => s.graphs);
    const setNodes = useGraphStore((s) => s.setNodes);
    const setEdges = useGraphStore((s) => s.setEdges);
    const addEdgeToStore = useGraphStore((s) => s.addEdge);

    const graph = graphs?.[activeGraphId] ?? { nodes: [], edges: [] };

    const nodeTypes = {
        OnStepNode: OnStepNode,
        OnEpisodeStartNode: OnEpisodeStartNode,
        InRadiusNode: InRadiusNode,
        LastActionIsNode: LastActionIsNode,
        StateEqualsToNode: StateEqualsToNode,
        CompareStateNode: CompareStateNode,
        EndEpisodeNode: EndEpisodeNode,
        AddRewardNode: AddRewardNode,
        SetStateNode: SetStateNode,
        RequestActionNode: RequestAction,
    }

    const onNodesChange = useCallback(
        (changes) => {
            if (!activeGraphId) return;
            setNodes(activeGraphId, (nodes) => applyNodeChanges(changes, nodes));
        },
        [activeGraphId, setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            if (!activeGraphId) return;
            setEdges(activeGraphId, (edges) => applyEdgeChanges(changes, edges));
        },
        [activeGraphId, setEdges]
    );

    const onConnect = useCallback(
        (connection) => {
            if (!activeGraphId) return;
            console.log("Connection: " + connection);
            const newEdge = {
                ...connection,
                id: `edge_${crypto.randomUUID()}`,
            };

            addEdgeToStore(activeGraphId, newEdge);
        },
        [activeGraphId, addEdgeToStore]
    );

    useEffect(() => {
        console.log("Nodes: " + JSON.stringify(graph?.nodes, null, 2));
        console.log("Edges: " + JSON.stringify(graph?.edges, null, 2));
    }, [graph?.nodes, graph?.edges])

    return (
        <div className="trainingEnvContainer">
            <ReactFlow
                nodes={graph.nodes}
                edges={graph.edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
            >
                <Background color="#000" variant={BackgroundVariant.Dots} />
                <MiniMap nodeStrokeWidth={1} nodeColor="#000" />
                <Controls />
            </ReactFlow>
        </div>
    );
}