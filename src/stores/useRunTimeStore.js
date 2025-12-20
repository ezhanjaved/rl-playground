//We will maintain state of simulation here (Play/pause, step, tick, controller mode, episode state)
import { create } from 'zustand';
import { useSceneStore } from './useSceneStore';
export const useRunTimeStore = create((set, get) => ({
     playing: false,
     togglePlaying: () => set({ playing: !get().playing }),
     training: false,
     toggleTraining: () => set({ training: !get().training }),
     experiments: {}, //This will hold training data - right?
     currentExperimentId: null,
     selectedAgent: null,
     setAgent: (id) => set({ selectedAgent: id }),

     updateExperiementStatus: (expId, statusSignal) =>
          set((state) => {
               const exp = state.experiments?.[expId];
               if (!exp) return state;

               if (exp.status === statusSignal) return state;

               return {
                    experiments: {
                         ...state.experiments,
                         [expId]: {
                              ...exp,
                              status: statusSignal,
                         },
                    },
               };
          }),


     syncEpisodeResult: (
          expId,
          agentId,
          updatedQTable,
          episodeIndex,
          episodeInfo,
          rewardEpisode
     ) =>
          set((state) => {
               const exp = state.experiments?.[expId];
               if (!exp) return state;

               const agent = exp.agents?.[agentId];
               if (!agent) return state;

               const prevRewards = agent.telemetry?.episodeRewards ?? [];
               const prevEpisodesInfo = agent.telemetry?.episodesInfo ?? {};

               return {
                    experiments: {
                         ...state.experiments,
                         [expId]: {
                              ...exp,
                              agents: {
                                   ...exp.agents,
                                   [agentId]: {
                                        ...agent,

                                        learningState: {
                                             ...agent.learningState,
                                             qTable: updatedQTable,
                                        },

                                        episodeState: {
                                             ...agent.episodeState,
                                             episodeIndex,
                                        },

                                        telemetry: {
                                             ...agent.telemetry,
                                             episodeRewards: [...prevRewards, rewardEpisode],
                                             episodesInfo: {
                                                  ...prevEpisodesInfo,
                                                  [episodeIndex]: episodeInfo,
                                             },
                                        },
                                   },
                              },
                         },
                    },
               };
          }),


     addExperiment: () => {
          const id = `experiment_${crypto.randomUUID()}`;
          const timeCreated = Date.now();
          const status = "Not Yet Started";

          const { assignments, entities } = useSceneStore.getState();
          const agents = {};

          for (const agentId of Object.keys(assignments || {})) {
               const a = assignments[agentId];
               if (!a?.assignedConfig || !a?.assignedGraphId) continue;

               agents[agentId] = {
                    graphId: a.assignedGraphId,
                    config: structuredClone(a.assignedConfig),
                    fixedPosition: structuredClone(entities?.[agentId]?.position),

                    learningState: {
                         algorithm: a.assignedConfig.algorithm,
                         qTable: {},
                         epsilon: 1.0,
                    },

                    episodeState: {
                         episodeIndex: 0,
                         stepIndex: 0,
                         rewardSum: 0,
                         done: false,
                    },

                    telemetry: {
                         episodeRewards: [],
                         episodesInfo: {},
                    },
               };
          }

          set((state) => ({
               currentExperimentId: id,
               experiments: {
                    ...(state.experiments || {}),
                    [id]: { id, timeCreated, status, agents },
               },
          }));

          return id;
     },

}));