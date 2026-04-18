import { create } from "zustand";

export const useTrainingStore = create((set) => ({
  model: null,
  rewardHistory: [],
  setModel: (model) => set({ model }),
  pushReward: (entry) =>
    set((s) => ({
      rewardHistory: [...s.rewardHistory.slice(-500), entry], // cap at 500 pts
    })),
}));
