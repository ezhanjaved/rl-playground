// We will maintain state of Behavior graphs (nodes/edges) it's params and validation
import { create } from "zustand";
import { validateGraphWithStore } from "../editor/nodes/validateGraph";
import { calculateRewardStats } from "../editor/nodes/calRew";

export const useGraphStore = create((set) => ({
  graphs: {},
  totalGraph: [],
  indexNumber: 0,
  activeGraphId: null,
  graphError: {},
  rewardDict: {},
  terminalReward: null,
  defRew: null,
  budgetSteps: null,
  maxShapingReward: 0,
  rewardStatus: null,

  setTerminal: (terminal) => set({ terminalReward: terminal }),
  setBudget: (budget) => set({ budgetSteps: budget }),
  addReward: (id, reward) =>
    set((state) => ({
      rewardDict: {
        ...state.rewardDict,
        [id]: reward,
      },
    })),

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
      // console.log("Total Num: " + totalNum);
      if (totalNum === 0 || totalNum === 1) return state;
      // console.log("Total Graphs: " + state.totalGraph);

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
      const rS = state.rewardStatus;
      validateGraphWithStore(
        updatedGraph,
        rS,
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
      const rS = state.rewardStatus;
      validateGraphWithStore(
        updatedGraph,
        rS,
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

      let updatedNodeData = null;

      const nodes = graph.nodes.map((node) => {
        if (node.id !== nodeId) return node;

        const updatedNode = {
          ...node,
          ...partial,
          data: {
            ...node.data,
            ...partial.data,
          },
        };

        updatedNodeData = updatedNode.data;
        return updatedNode;
      });

      let rewardDict = { ...state.rewardDict };
      let terminalReward = state.terminalReward;
      let budgetSteps = state.budgetSteps;

      if (updatedNodeData) {
        if (updatedNodeData.typeOfReward === "Shaping") {
          rewardDict[nodeId] = updatedNodeData.rewardValue;
        } else {
          delete rewardDict[nodeId];
        }

        if (updatedNodeData.typeOfReward === "Terminal") {
          terminalReward = updatedNodeData.rewardValue;
        }

        if (updatedNodeData.maxSteps !== undefined) {
          budgetSteps = updatedNodeData.maxSteps;
        }
      }

      const rewardStats = calculateRewardStats(
        rewardDict,
        terminalReward,
        budgetSteps,
      );

      console.log("Reward Status: " + JSON.stringify(rewardStats, null, 2));
      return {
        rewardDict,
        terminalReward,
        budgetSteps,
        ...rewardStats,

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

  deleteGraph: (graphId) =>
    set((state) => {
      const graphs = { ...state.graphs };
      delete graphs[graphId];

      const newTotal = state.totalGraph.filter((id) => id !== graphId);
      const graphError = { ...state.graphError };
      delete graphError[graphId];

      let activeGraphId = state.activeGraphId;
      let indexNumber = state.indexNumber;

      if (activeGraphId === graphId) {
        indexNumber = Math.min(state.indexNumber, newTotal.length - 1);
        activeGraphId = newTotal[indexNumber] ?? null;
      }

      return {
        graphs,
        totalGraph: newTotal,
        graphError,
        activeGraphId,
        indexNumber,
      };
    }),

  deleteNode: (graphId, nodeId) =>
    set((state) => {
      const graph = state.graphs[graphId];
      if (!graph) return state;

      const deletedNode = graph.nodes.find((node) => node.id === nodeId);

      const rewardDict = { ...state.rewardDict };
      delete rewardDict[nodeId];

      let terminalReward = state.terminalReward;

      if (deletedNode?.data?.typeOfReward === "Terminal") {
        terminalReward = null;
      }

      const rewardStats = calculateRewardStats(
        rewardDict,
        terminalReward,
        state.budgetSteps,
      );

      return {
        rewardDict,
        terminalReward,
        ...rewardStats,

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
