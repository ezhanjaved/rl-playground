export function filterObs(arr) {
  const result = arr.filter((_, index) => index !== 9 && index !== 16);
  return result
}
