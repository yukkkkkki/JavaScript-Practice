/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
// 方法一：二分查找
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
// 时间复杂度：O(logn)
// 空间复杂度：O(1)

// 方法二：排序
var findClosestElements = function (arr, k, x) {
  const list = [...arr];
  list.sort((a, b) => {
    if (Math.abs(a - x) !== Math.abs(b - x)) {
      return Math.abs(a - x) - Math.abs(b - x);
    } else {
      return a - b;
    }
  });
  const res = list.slice(0, k);
  res.sort((a, b) => a - b);
  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
