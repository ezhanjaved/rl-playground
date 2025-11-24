import animationMap from "./animationsMap.js";
export default function animationsMapper(name, actionPerformed) {
    return animationMap[name][actionPerformed];
}