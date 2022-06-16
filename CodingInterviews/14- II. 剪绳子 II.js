/**
 * @param {number} n
 * @return {number}
 */
// 方法一：贪心
var cuttingRope = function (n) {
  let resArr = [0, 0, 1, 2, 4];
  if (n < 5) return resArr[n];

  let mod = 1e9 + 7;
  let res = 1;
  while (n >= 5) {
    res = (res % mod) * 3;
    n -= 3;
  }
  return (res * n) % mod;
};

// 方法二：动态规划
// dp[i]：长度为 i 的绳子剪成 m 段后的最大乘积
// dp[i] = max(dp[i], max(j * (i - j), j * dp[i - j]))
var cuttingRope = function (n) {
  const dp = new Array(n + 1).fill(0);
  // 初始化
  // 如果只剪掉长度为 1，对最后的乘积无任何增益，所以从长度为 2开始剪
  dp[2] = 1;
  let max = 0;
  for (let i = 2; i <= n; i++) {
    // 先把绳子剪掉第一段（长度为 j）
    for (let j = 1; j < i; j++) {
      // 剪了第一段后，剩下 (i - j) 长度可以剪也可以不剪
      // 不剪：j * (i - j)；剪：j * dp[i - j]
      max = Math.max(j * (i - j), j * dp[i - j]);
      dp[i] = Math.max(dp[i], max);
    }
  }
  return dp[n];
};
