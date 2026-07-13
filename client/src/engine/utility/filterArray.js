export function filterObs(arr) {
  const result = arr.filter((_, index) => index !== 15);
  return result
}


export function makeAgentBelieveItIsCoin(arr) {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0];

  return [...arr.slice(0, 4), ...data];
}
