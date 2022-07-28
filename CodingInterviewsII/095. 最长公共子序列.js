/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 方法一：动态规划
// dp[i][j] 表示 text1[0...i] 和 text2[0...j] 的最长公共子序列的长度
// 边界条件：当 i = 0 或 j = 0 时，dp[i][j] = 0
// 当 text1[i - 1] = text2[j - 1] 时，dp[i][j] = dp[i - 1][j - 1] + 1;
// 当 text1[i - 1] != text2[j - 1] 时，考虑以下两项：
//  - text1[0 : i - 1] 和 text2[0 : j] 的最长公共子序列
//  - text1[0 : i] 和 text2[0 : j - 1] 的最长公共子序列
// 即 dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    const c1 = text1[i - 1];
    for (let j = 1; j <= n; j++) {
      const c2 = text2[j - 1];
      if (c1 === c2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
