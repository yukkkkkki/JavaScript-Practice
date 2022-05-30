/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：动态规划
// 当前格子的总礼物价值，只与格子(i - 1, j)和(i, j - 1)有关
// dp(i, j) = max(dp(i, j - 1), dp(i - 1, j)) + grid[i][j]
var maxValue = function (grid) {
  if (!grid) return 0;

  const m = grid.length;
  const n = grid[0].length;
  const res = new Array(m).fill(new Array(n).fill(0));

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      let left = 0;
      let up = 0;
      if (i > 0) up = res[i - 1][j];
      if (j > 0) left = res[i][j - 1];

      res[i][j] = Math.max(up, left) + grid[i][j];
    }
  }
  return res[m - 1][n - 1];
};
// 时间复杂度 O(MN)
// 空间复杂度 O(1)

// 优化：用一维数组代替之前的res
var maxValue = function (grid) {
  if (!grid) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const res = new Array(cols).fill(0);

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let left = 0;
      let up = 0;
      if (i > 0) up = res[j];
      if (j > 0) left = res[j - 1];

      res[j] = Math.max(up, left) + grid[i][j];
    }
  }
  return res[cols - 1];
};
