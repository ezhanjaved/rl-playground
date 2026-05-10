// BehaviorGraphEditor.jsx
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraphStore } from "../stores/useGraphStore.js";
import { useCallback, useEffect } from "react";
import { OnStepNode, OnEpisodeStartNode } from "./nodes/eventNodes.jsx";
import {
  InRadiusNode,
  LastActionIsNode,
  StateEqualsToNode,
  CompareStateNode,
  IsDistanceLessNode,
  NumericObsNode,
  BoolObsNode,
  IsDeltaXLessNode,
  IsDeltaZPosNode,
  IsObstacleInPath,
} from "./nodes/conditionalNodes.jsx";
import {
  EndEpisodeNode,
  AddRewardNode,
  TruncateEpisodeNode,
} from "./nodes/effectNodes.jsx";

export function BehaviorGraphEditor() {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const graphs = useGraphStore((s) => s.graphs);
  const setNodes = useGraphStore((s) => s.setNodes);
  const setEdges = useGraphStore((s) => s.setEdges);
  const addEdgeToStore = useGraphStore((s) => s.addEdge);

  const graph = activeGraphId ? graphs[activeGraphId] : null;

  const nodeTypes = {
    OnStepNode: OnStepNode,
    IsDistanceLessNode: IsDistanceLessNode,
    IsDeltaXLessNode: IsDeltaXLessNode,
    IsDeltaZPosNode: IsDeltaZPosNode,
    OnEpisodeStartNode: OnEpisodeStartNode,
    InRadiusNode: InRadiusNode,
    LastActionIsNode: LastActionIsNode,
    StateEqualsToNode: StateEqualsToNode,
    CompareStateNode: CompareStateNode,
    EndEpisodeNode: EndEpisodeNode,
    AddRewardNode: AddRewardNode,
    NumericObsNode: NumericObsNode,
    BoolObsNode: BoolObsNode,
    IsObstacleInPath: IsObstacleInPath,
    TruncateEpisodeNode: TruncateEpisodeNode,
  };

  const onNodesChange = useCallback(
    (changes) => {
      if (!activeGraphId) return;
      setNodes(activeGraphId, (nodes) => applyNodeChanges(changes, nodes));
    },
    [activeGraphId, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      if (!activeGraphId) return;
      setEdges(activeGraphId, (edges) => applyEdgeChanges(changes, edges));
    },
    [activeGraphId, setEdges],
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
    [activeGraphId, addEdgeToStore],
  );

  useEffect(() => {
    console.log("Nodes: " + JSON.stringify(graph?.nodes, null, 2));
    console.log("Edges: " + JSON.stringify(graph?.edges, null, 2));
  }, [graph?.nodes, graph?.edges]);

  if (!graph) {
    return (
      <div className="no-graph-screen">
        <h2>No Graph Present...</h2>
        <span>
          Click "+" button to create a new graph or upload using the template
          picker.
        </span>
      </div>
    );
  }

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
