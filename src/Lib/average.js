export function average(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return Number((sum / array.length).toFixed(2));
}
