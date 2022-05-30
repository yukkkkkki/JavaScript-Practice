/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：排序
var minMoves2 = function (nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let result = 0;
  let x = nums[Math.floor(n / 2)];

  for (let i = 0; i < n; i++) {
    result += Math.abs(nums[i] - x);
  }
  return result;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
