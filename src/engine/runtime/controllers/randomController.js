// random baseline
export default function randomController(action_space) {
  const actionIndex = Math.floor(Math.random() * action_space.length);
  return action_space[actionIndex]; //5 is pick & 6 is drop
}

export function getNextAction(action_space) {
  const actionList = [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0];
  let index = 0;
  if (index >= actionList.length) {
    return action_space[3];
  }
  return action_space[actionList[index++]];
}
