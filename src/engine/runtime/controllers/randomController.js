// random baseline
export default function randomController(action_space) {
    const actionIndex = Math.floor(Math.random() * action_space.length);
    return action_space[actionIndex]; //Idle action 
}