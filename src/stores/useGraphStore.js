// We will maintain state of Behavior graphs (nodes/edges) it's params and validation
import { create } from "zustand";

export const useGraphStore = create((set, get) => ({
  graphs: {},
  totalGraph: [],
  indexNumber: 0,
  activeGraphId: null,

  updateName: (graphId, name) => set((state) => {
    const graph = graphId ? state.graphs[graphId] : state.graph[state.activeGraphId];
    if(!graph) return state;
    if(!name) return state;
    return {
      graphs: {
        ...state.graphs,
        [graphId] : {
          ...graph,
          name: name
        }
      }
    }
  }),

  nextGraph: () =>
    set((state) => {
      const totalNum = state.totalGraph.length;
      console.log("Total Num: " + totalNum);
      if (totalNum === 0 || totalNum === 1) return state;
      console.log("Total Graphs: " + state.totalGraph);

      const newIndex = (state.indexNumber + 1) % totalNum;
      const newActiveId = state.totalGraph[newIndex];

      return {
        ...state,
        indexNumber: newIndex,
        activeGraphId: newActiveId
      };
    }),


  addGraph: () =>
    set((state) => {
      const id = `graph_${crypto.randomUUID()}`;
      const graph = { nodes: [], edges: [], name: null, id: id };
      const newTotal = [...state.totalGraph, id];

      return {
        ...state,  
        graphs: { ...state.graphs, [id]: graph },
        totalGraph: newTotal,
        indexNumber: newTotal.length - 1, 
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