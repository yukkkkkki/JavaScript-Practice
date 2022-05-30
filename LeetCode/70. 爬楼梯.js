/**
 * @param {number} n
 * @return {number}
 */
// 方法一：斐波那契公式解决
// 特征方程为 x^2 = x^1 +1;
var climbStairs = function (n) {
  const sqrt_5 = Math.sqrt(5);
  const fib_n =
    Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2, n + 1);
  return Math.round(fib_n / sqrt_5);
};

// 方法二：动态规划
// dp[n] = dp[n − 1] + dp[n − 2]
var climbStairs = function (n) {
  // 初始化
  const dp = [];
  dp[0] = 1; // 什么都不做也算是一种方法了
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
// 时间复杂度：O(n)
