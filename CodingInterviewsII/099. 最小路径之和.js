/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：动态规划
var minPathSum = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  if (n === 0 || m === 0) return 0;

  const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));
  // 边界值
  dp[0][0] = grid[0][0];
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[n - 1][m - 1];
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
