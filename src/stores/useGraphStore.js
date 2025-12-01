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

}));