// 给你一个 m * n 的矩阵 mat 和一个整数 K ，请你返回一个矩阵 answer ，其中每个 answer[i][j] 是所有满足下述条件的元素 mat[r][c] 的和：

//     i - K <= r <= i + K, j - K <= c <= j + K
//     (r, c) 在矩阵内。

// 示例 1：
// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], K = 1
// 输出：[[12,21,16],[27,45,33],[24,39,28]]

// 示例 2：
// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], K = 2
// 输出：[[45,45,45],[45,45,45],[45,45,45]]

// 前缀和 + 动态规划
var matrixBlockSum = function (mat, K) {
  const m = mat.length;
  const n = mat[0].length;
  const res = new Array(m).fill(0).map((x) => Array(n).fill(0));
  const dp = new Array(m + 1).fill(0).map((x) => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 计算矩阵前缀和
      dp[i][j] =
        mat[i - 1][j - 1] + dp[i][j - 1] + dp[i - 1][j] - dp[i - 1][j - 1];
    }
  }
  // console.log(dp);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let x0 = Math.max(i - K - 1, 0);
      let x1 = Math.min(i + K, m);
      let y0 = Math.max(j - K - 1, 0);
      let y1 = Math.min(j + K, n);
      res[i - 1][j - 1] = dp[x1][y1] - dp[x1][y0] - dp[x0][y1] + dp[x0][y0];
    }
  }
  return res;
};
