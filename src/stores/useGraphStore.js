// We will maintain state of Behavior graphs (nodes/edges) it's params and validation
import { create } from "zustand";

export const useGraphStore = create((set, get) => ({
  graphs: {},
  activeGraphId: null,

  addGraph: () =>
    set((state) => {
      const id = `graph_${crypto.randomUUID()}`;
      const graph = { nodes: [], edges: [] };

      return {
        graphs: { ...state.graphs, [id]: graph },
        activeGraphId: id,
      };
    }),

  addNode: (graphId, nodeData) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state; // guard

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            nodes: [...graph.nodes, nodeData],
          },
        },
      };
    }),

  addEdge: (graphId, edgeData) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            edges: [...graph.edges, edgeData],
          },
        },
      };
    }),

  setNodes: (graphId, updater) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const nextNodes = typeof updater === "function" ? updater(graph.nodes) : updater;

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            nodes: nextNodes,
          },
        },
      };
    }),

  setEdges: (graphId, updater) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const nextEdges = typeof updater === "function" ? updater(graph.edges) : updater;

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            edges: nextEdges,
          },
        },
      };
    }),

  updateNode: (graphId, nodeId, partial) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const nodes = graph.nodes.map((node) => node.id === nodeId ? { ...node, ...partial } : node);

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            nodes,
          },
        },
      };
    }),

  updateEdge: (graphId, edgeId, partial) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const edges = graph.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, ...partial } : edge
      );

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            edges,
          },
        },
      };
    }),

  deleteNode: (graphId, nodeId) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            nodes: graph.nodes.filter((n) => n.id !== nodeId),
            edges: graph.edges.filter(
              (e) => e.source !== nodeId && e.target !== nodeId
            ),
          },
        },
      };
    }),

}));