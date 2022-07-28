/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// 方法一：动态规划
var numDistinct = function (s, t) {
  const m = s.length;
  const n = t.length;
  // 如果 m < n，则 t 一定不是 s 的子序列
  if (m < n) return 0;

  // dp[i][j]：s[i:] 的子序列中 t[j:] 出现的个数
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // 边界情况：
  // 当 i == m 且 j < n，s[i:] 为空字符串，t[j:] 为非空字符串，故对任意 0 <= j < n，有 dp[m][j] = 0
  // 当 j == n，t[j:] 为空字符串，故对任意 0 <= i <= m，有 dp[i][n] = 1
  for (let i = 0; i <= m; i++) {
    dp[i][n] = 1;
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (s[i] === t[j]) {
        // 如果 s[i] 和 t[j] 匹配，则考虑 t[j + 1:] 作为 s[i + 1:] 的子序列，子序列数为 dp[i + 1][j + 1]
        // 如果 s[i] 不和 t[j] 匹配，则考虑 t[j:] 作为 s[i + 1:] 的子序列，子序列数为 dp[i + 1][j]
        dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j];
      } else {
        // s[i] 不能和 t[j] 匹配，只考虑 t[j:] 作为 s[i + 1:] 的子序列
        dp[i][j] = dp[i + 1][j];
      }
    }
  }

  return dp[0][0];
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
