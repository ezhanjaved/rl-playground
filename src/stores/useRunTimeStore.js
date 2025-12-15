//We will maintain state of simulation here (Play/pause, step, tick, controller mode, episode state)
import {create} from 'zustand';
import { useSceneStore } from './useSceneStore';
export const useRunTimeStore = create((set, get) => ({
     playing: false,
     togglePlaying: () => set({playing: !get().playing}),
     training: false,
     toggleTraining: () => set({training: !get().training}),
     experiments: {}, //This will hold training data - right?
     currentExperimentId: null,

     updateExperiementStatus: (id, statusSignal) => set((state) => ({
          experiments: {
               ...state.experiments,
               [id]: {
                    ...state.experiments[id],
                    status: statusSignal
               }
          }
     })),

     syncEpisodeResult: (expId, agentId, updatedTable, episodeIndex, episodeInfo, rewardEpisode) => set((state) => ({
          experiments: {
               ...state.experiments,
               [expId]: {
                    ...state.experiments[expId],
                    agents: {
                         ...state.experiments[expId].agents,
                         [agentId]: {
                              ...state.experiments[expId].agents[agentId],
                              learningState: {
                                   ...state.experiments[expId].agents[agentId].learningState,
                                   qTable: updatedTable
                              },
                              
                              episodeState: {
                                   ...state.experiments[expId].agents[agentId].episodeState,
                                   episodeIndex: episodeIndex,
                              },

                              telemetry: {
                                   episodeRewards: [...state.experiments[expId].agents[agentId].telemetry.episodeRewards, rewardEpisode],
                                   episodesInfo: {
                                        ...state.experiments[expId].agents[agentId].telemetry.episodesInfo,
                                        [episodeIndex]:episodeInfo
                                   },
                              }
                         }
                    }
               }
          }
     })),

     addExperiement: () => set((state) => {
          const id = `experiment_${crypto.randomUUID()}`
          const timeCreated = Date.now()
          const status = "Training" //Others: Paused, Completed
          const agents = {}
          const { assignments }= useSceneStore.getState()
          for (const agentId of Object.keys(assignments)) { //assignments is object and its keys are agentId
               agents[agentId] = {
                    graphId: assignments[agentId].assignedGraphId,
                    config: structuredClone(assignments[agentId].assignedConfig),

                    learningState: {
                         algorithm: assignments[agentId].assignedConfig.algorithm,
                         qTable: {},
                         epsilon: 1.0
                    },

                    episodeState: {
                         episodeIndex: 0,
                         stepIndex: 0,
                         rewardSum: 0,
                         done: false,
                    },

                    telemetry: {
                         episodeRewards: [],
                         episodesInfo: {}
                    },
               };
          }

          return {
               currentExperimentId: id,
               experiments: {
                    ...state.experiments,
                    [id]: {
                         id,
                         timeCreated,
                         status,
                         agents
                    }
               }
          }
     }),
}));