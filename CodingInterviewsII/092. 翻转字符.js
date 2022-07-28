/**
 * @param {string} s
 * @return {number}
 */
// 方法一：动态规划
// 单调递增的字符串满足以下性质：
// - 首个字符是 0 或 1；
// - 其余的每个字符，字符 0 前面的相邻字符一定是 0，字符 1 前面的相邻字符可以是 0 或 1
// dp[i][0] 和 dp[i][1] 分别表示下标 i 处的字符为 0 和 1 的情况下使得 s[0 .. i] 单调递增的最小翻转次数。

// 当 i = 0，对应长度为 1 的前缀，一定满足单调递增，因此，dp[0][0] 和 dp[0][1] 的值取决于字符 s[i]
// dp[0][0] = I(s[0]=‘1’)
// dp[0][1] = I(s[0]=‘0’)
// (I 为示性函数，当事件成立时示性函数值为 1，当事件不成立时示性函数值为 0)
// dp[i][0] = dp[i - 1][0] + I(s[i]=‘1’)
// dp[i][0] = min(dp[i - 1][0], dp[i - 1][1]) + I(s[i]=‘0’)
// 优化：由于 dp[i] 的值只和 dp[i − 1] 有关，因此在计算状态值的过程中只需要维护前一个下标处的状态值
var minFlipsMonoIncr = function (s) {
  const n = s.length;
  let dp0 = 0;
  let dp1 = 0;

  for (let i = 0; i < n; i++) {
    const c = s[i];
    let dp0New = dp0;
    let dp1New = Math.min(dp0, dp1);

    if (c === '1') {
      dp0New++;
    } else {
      dp1New++;
    }

    dp0 = dp0New;
    dp1 = dp1New;
  }

  return Math.min(dp0, dp1);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
