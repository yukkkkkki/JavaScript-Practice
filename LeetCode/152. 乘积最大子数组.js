/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
var maxProduct = function (nums) {
  let max = nums[0];
  let min = nums[0];
  let res = nums[0];

  let dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      [max, min] = [min, max];
    }

    max = Math.max(max * nums[i], nums[i]);
    min = Math.min(min * nums[i], nums[i]);
    dp[i] = max;
    res = Math.max(dp[i], res);
  }

  return res;
};
