/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (x - arr[mid] > arr[mid + k] - x) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return arr.slice(low, low + k);
};
