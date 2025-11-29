//We will maintain state of simulation here (Play/pause, step, tick, controller mode, episode state)
import {create} from 'zustand';

export const useRunTimeStore = create((set, get) => ({
     playing: false,
     togglePlaying: () => set({playing: !get().playing}),
}));