/**
 * @param {number[]} cost
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：达到下标 i 的最小花费
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const dp = new Array(n + 1);
  // 可以选择下标 0 或 1 作为初始阶梯，因此有 dp[0] = dp[1] = 0
  dp[0] = dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
