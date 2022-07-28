/**
 * @param {number[][]} costs
 * @return {number}
 */
// 方法一：动态规划
// 由于每个房子可以被粉刷成三种颜色中的一种，因此需要分别考虑粉刷成三种颜色时的最小花费成本
// dp[i][j]：粉刷到第 0 号房子到第 i 号房子，且第 i 号房子被粉刷成第 j 种颜色时的最小花费成本
// 当第 i 号房子分别被粉刷成三种颜色时，粉刷第 0 号房子到第 i 号房子的最小花费成本计算如下
//   dp[i][0] = min(dp[i − 1][1], dp[i − 1][2]) + costs[i][0]
//   dp[i][1] = min(dp[i − 1][0], dp[i − 1][2]) + costs[i][1]
//   dp[i][2] = min(dp[i − 1][0], dp[i − 1][1]) + costs[i][2]​
// 三种颜色的情况可以合并为：
// dp[i][j] = min(dp[i - 1][(j + 1) mod 3], dp[i - 1][(j + 2) mod 3]) + cost[i][j]
var minCost = function (costs) {
  const n = costs.length;
  let dp = new Array(3).fill(0);
  for (let j = 0; j < 3; j++) {
    dp[j] = costs[0][j];
  }

  for (let i = 1; i < n; i++) {
    const dpNew = new Array(3).fill(0);
    for (let j = 0; j < 3; j++) {
      dpNew[j] = Math.min(dp[(j + 1) % 3], dp[(j + 2) % 3]) + costs[i][j];
    }
    dp = dpNew;
  }

  return parseInt(_.min(dp));
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
