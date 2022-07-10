/**
 * @param {string} s
 * @return {number}
 */
// 方法一：动态规划
// dp[i][0] 表示下标 i 处的字符为 0 的情况下，使得 s[0,...,i] 单调递增的最小翻转次数
// dp[i][1] 表示下标 i 处的字符为 1 的情况下，是的 s[0,...,i] 单调递增的最小翻转次数
// 状态转移方程：
// dp[i][0] = dp[i − 1][0] + I(s[i] = ‘1’)
// dp[i][1] = min(dp[i − 1][0], dp[i − 1][1]) + I(s[i]=‘0’)
var minFlipsMonoIncr = function (s) {
  const n = s.length;
  // 边界情况：
  let dp0 = 0;
  let dp1 = 0;
  // 由于 dp[i] 的值只与 dp[i - 1] 有关，因此在计算状态值的过程中只需要维护前一个下标处的状态值，将空间复杂度降低到 O(1)
  for (let i = 0; i < n; i++) {
    const c = s[i];
    let dp0New = dp0;
    let dp1New = Math.min(dp0, dp1);

    if (c === '1') dp0New++;
    else dp1New++;

    dp0 = dp0New;
    dp1 = dp1New;
  }

  return Math.min(dp0, dp1);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
