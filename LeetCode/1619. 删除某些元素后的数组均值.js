/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：排序
var trimMean = function (arr) {
  const n = arr.length;
  arr.sort((a, b) => a - b);

  let res = 0;
  for (let i = n / 20; i < (19 * n) / 20; i++) {
    res += arr[i];
  }

  return res / (n * 0.9);
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)

let arr = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];
console.log(trimMean(arr));
