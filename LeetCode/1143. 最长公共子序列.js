// 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

// 若这两个字符串没有公共子序列，则返回 0。

// 示例 1:
// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace"，它的长度为 3。

// 示例 2:
// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc"，它的长度为 3。

// 示例 3:
// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0。

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

// 方法一：动态规划
// 思路：
// dp[i][j]: 对于text1[1..i] 和 text2[1..j]，他们的最小前缀和
// 动态转移方程：
// i 和 j 从1开始从前往后遍历text1 和 text2
// 如果text1[i] == text2[j]，则这个字符一定在lcs中，更新dp
//     dp[i][j] = 1 +dp[i - 1][j - 1]
// 否则，text1[i] 和 text2[j] 这两个字符至少有一个不在lcs中，则继续找哪一个能让lcs更长
// dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      dp[i][j] = 0;
    }
  }
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i == 0 || j == 0) {
        dp[i][j] == 0;
      } else if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
};
