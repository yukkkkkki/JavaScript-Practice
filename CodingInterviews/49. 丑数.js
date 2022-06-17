/**
 * @param {number} n
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：表示第 i 个丑数
// 当 2 ≤ i ≤ n：dp[i] = min(dp[p2] × 2, dp[p3] × 3, dp[p5] × 5)
var nthUglyNumber = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  let p2 = 1;
  let p3 = 1;
  let p5 = 1;

  for (let i = 2; i <= n; i++) {
    const num2 = dp[p2] * 2;
    const num3 = dp[p3] * 3;
    const num5 = dp[p5] * 5;

    dp[i] = Math.min(Math.min(num2, num3), num5);

    if (dp[i] === num2) p2++;
    if (dp[i] === num3) p3++;
    if (dp[i] === num5) p5++;
  }

  return dp[n];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
