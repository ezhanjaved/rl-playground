import { create } from "zustand";

export const useCanvasSetting = create((set, get) => ({
    pickedColor: "purple",
    debugMode: true,

    colorLibrary: {
        green: ["#B2FBA5", "#91BC9E55"],
        pink: ["#FFB7C5", "#C48A9355"],
        peach: ["#FFD8B5", "#C3A88B55"],
        orange: ["#FFDFB3", "#C4B28A55"],
        purple: ["#DCC7FF", "#A69BC455"],
        yellow: ["#FFF7A5", "#C4BF7B55"],
    },

    toggleDebug: () => set ({debugMode: !get().debugMode}),
    changeColor: (color) => set({ pickedColor: color })

}));