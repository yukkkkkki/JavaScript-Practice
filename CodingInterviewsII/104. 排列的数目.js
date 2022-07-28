/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 方法一：动态规划
var combinationSum4 = function (nums, target) {
  // dp[x] 表示选取的元素之和为 x 的方案数
  const dp = new Array(target + 1).fill(0);
  // 不选取任何元素时，元素之和为 0
  dp[0] = 1;

  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      // 如果存在一种排列，其中的元素之和等于 i
      // 则该排列的最后一个元素一定是数组 nums 中的一个元素
      // 假设该排列最后一个元素是 num，则一定有 num <= i
      if (num <= i) {
        // 对于元素之和为 i - num 的每一种排列，在最后添加 num 之后，即可得到一个元素之和 == i 的排列
        // 所以 dp[i] = dp[i] + dp[i - num]
        dp[i] += dp[i - num];
      }
    }
  }

  return dp[target];
};
// 时间复杂度：O(target x n)
// 空间复杂度：O(target)
