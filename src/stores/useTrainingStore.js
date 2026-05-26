import { create } from "zustand";

export const useTrainingStore = create((set) => ({
  model: null,
  rewardHistory: [],
  epRewMeanHistory: [],
  epLenMeanHistory: [],

  setModel: (model) => set({ model }),

  // Bulk replace (used on initial load and realtime full-array updates)
  setRewardHistory: (arr) => set({ rewardHistory: arr }),
  setEpRewMeanHistory: (arr) => set({ epRewMeanHistory: arr }),
  setEpLenMeanHistory: (arr) => set({ epLenMeanHistory: arr }),

  pushReward: (entry) =>
    set((s) => ({
      rewardHistory: [...s.rewardHistory.slice(-500), entry],
    })),

  pushEpRewMean: (entry) =>
    set((s) => ({
      epRewMeanHistory: [...s.epRewMeanHistory.slice(-500), entry],
    })),

  pushEpLenMean: (entry) =>
    set((s) => ({
      epLenMeanHistory: [...s.epLenMeanHistory.slice(-500), entry],
    })),
}));
