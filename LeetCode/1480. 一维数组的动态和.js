/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：原地动态规划
var runningSum = function (nums) {
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    nums[i] = nums[i] + nums[i - 1];
  }
  return nums;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
