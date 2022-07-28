/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 方法一：动态规划
// f(i, j)：从左上角走到 (i, j) 的路径数量
// 由于每一步只能从向下或者向右移动一步，所以状态转移方程：f(i, j) = f(i - 1, j) + f(i, j - 1)
var uniquePaths = function (m, n) {
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
  // 边界条件
  for (let i = 0; i < m; i++) {
    f[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    f[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
  }

  return f[m - 1][n - 1];
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
