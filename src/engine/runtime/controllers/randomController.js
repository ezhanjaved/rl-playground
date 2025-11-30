// random baseline
export default function randomController(action_space) {
    const actionIndex = Math.floor(Math.random() * action_space.length);
    return action_space[5]; //5 is pick & 6 is drop 
}