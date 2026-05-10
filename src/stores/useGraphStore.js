// We will maintain state of Behavior graphs (nodes/edges) it's params and validation
import { create } from "zustand";
import { validateGraphWithStore } from "../editor/nodes/validateGraph";

export const useGraphStore = create((set, get) => ({
  graphs: {},
  totalGraph: [],
  indexNumber: 0,
  activeGraphId: null,
  graphError: {},

  addGraphError: (id, result) =>
    set((state) => ({
      graphError: {
        ...state.graphError,
        [id]: result,
      },
    })),

  removeGraphError: (id) =>
    set((state) => {
      const updated = { ...state.graphError };
      delete updated[id];
      return { graphError: updated };
    }),

  updateName: (graphId, name) =>
    set((state) => {
      const graph = graphId
        ? state.graphs[graphId]
        : state.graph[state.activeGraphId];
      if (!graph) return state;
      if (!name) return state;
      return {
        graphs: {
          ...state.graphs,
          [graphId]: {
            ...graph,
            name: name,
          },
        },
      };
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
        activeGraphId: newActiveId,
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

  addGraphWithId: (id, graphObj) =>
    set((state) => {
      const graph = graphObj;
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

      const nextNodes =
        typeof updater === "function" ? updater(graph.nodes) : updater;

      const updatedGraph = { ...graph, nodes: nextNodes };

      validateGraphWithStore(
        updatedGraph,
        (id, errs) =>
          set((s) => ({ graphError: { ...s.graphError, [id]: errs } })),
        (id) =>
          set((s) => {
            const updated = { ...s.graphError };
            delete updated[id];
            return { graphError: updated };
          }),
      );

      return {
        graphs: {
          ...state.graphs,
          [graphId]: updatedGraph,
        },
      };
    }),

  setEdges: (graphId, updater) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const nextEdges =
        typeof updater === "function" ? updater(graph.edges) : updater;

      const updatedGraph = { ...graph, edges: nextEdges };

      validateGraphWithStore(
        updatedGraph,
        (id, errs) =>
          set((s) => ({ graphError: { ...s.graphError, [id]: errs } })),
        (id) =>
          set((s) => {
            const updated = { ...s.graphError };
            delete updated[id];
            return { graphError: updated };
          }),
      );

      return {
        graphs: {
          ...state.graphs,
          [graphId]: updatedGraph,
        },
      };
    }),

  updateNode: (graphId, nodeId, partial) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const nodes = graph.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...partial } : node,
      );

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
        edge.id === edgeId ? { ...edge, ...partial } : edge,
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
              (e) => e.source !== nodeId && e.target !== nodeId,
            ),
          },
        },
      };
    }),
}));
