//We will maintain state of simulation here (Play/pause, step, tick, controller mode, episode state)
import {create} from 'zustand';

export const useRunTimeStore = create((set, get) => ({
     playing: false,
     togglePlaying: () => set({playing: !get().playing}),
     training: false,
     toggleTraining: () => set({training: !get().training}),

     episodeNumber: 0,
     setEpisodeNumber: (num) => set({episodeNumber: num}),
     maxStepsPerEpisode: 0,
     setMaxEpisodeSteps: (num) => set({maxStepsPerEpisode: num}),
     rewardImportance: 0,
     setRewardImportance: (num) => set({rewardImportance: num}),
     algorithm: null,
     setAlgorithm: (algo) => set({algorithm: algo}),
     explorationStrategy: null,
     setExplorationStrategy: (strategy) => set({explorationStrategy: strategy}),
     learningSpeed: null,
     setLearningSpeed: (speed) => set({learningSpeed: speed}),
     agentSpawnMode:null,
     setAgentSpawnMode: (mode) => set({agentSpawnMode: mode}),
     objectSpawnMode: null,
     setObjectSpawnMode: (mode) => set ({objectSpawnMode: mode}),
     rewardMultiplier: 1,
     setRewardMultiplier: (multiplier) => set({rewardMultiplier: multiplier}),

     trainingConfig: () => {
          const state = get();
          return {
               episodeNumber: state.episodeNumber,
               maxStepsPerEpisode: state.maxStepsPerEpisode,
               rewardImportance: state.rewardImportance,
               algorithm: state.algorithm,
               explorationStrategy: state.explorationStrategy,
               learningSpeed: state.learningSpeed,
               agentSpawnMode: state.agentSpawnMode,
               objectSpawnMode: state.objectSpawnMode,
               rewardMultiplier: state.rewardMultiplier,
          };
     }

}));