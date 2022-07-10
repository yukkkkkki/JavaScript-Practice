/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
// 方法一：动态规划
var minRefuelStops = function (target, startFuel, stations) {
  const n = stations.length;
  // dp[i] 表示加油 i 次的最大行驶英里数
  const dp = new Array(n + 1).fill(0);
  dp[0] = startFuel;
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      // 只有当 dp[j] ≥ stations[i][0] 时才能在加油 j 次的情况下到达加油站 stations[i] 的位置
      if (dp[j] >= stations[i][0]) {
        dp[j + 1] = Math.max(dp[j + 1], dp[j] + stations[i][1]);
      }
    }
  }
  for (let i = 0; i <= n; i++) {
    if (dp[i] >= target) {
      return i;
    }
  }
  return -1;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
