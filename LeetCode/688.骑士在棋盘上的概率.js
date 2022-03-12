/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
// 方法一：动态规划
// dp[step][i][j] 表示骑士从棋盘上的点 (i,j) 出发，走了step 步时仍然留在棋盘上的概率
// 当点 (i, j) 不在棋盘上时，dp[step][i][j] = 0
// 点 (i, j) 在棋盘上且 step = 0 时，dp[step][i][j] = 1
// dp[step][i][j] += dp[step - 1][ni][nj] / 8
const dirs = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
];
var knightProbability = function (n, k, row, column) {
  const dp = new Array(k + 1)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)));

  for (let step = 0; step <= k; step++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (step === 0) {
          dp[step][i][j] = 1;
        } else {
          for (const dir of dirs) {
            const ni = i + dir[0];
            const nj = j + dir[1];
            if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
              dp[step][i][j] += dp[step - 1][ni][nj] / 8;
            }
          }
        }
      }
    }
  }

  return dp[k][row][column];
};
