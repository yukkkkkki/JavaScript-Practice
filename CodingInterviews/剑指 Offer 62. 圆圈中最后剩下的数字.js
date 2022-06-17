/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：i 个数字里幸存者的下标，1个数字的下标是 0
// dp[i] = (dp[i - 1] + m % i) % i
var lastRemaining = function (n, m) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + (m % i)) % i;
  }
  return dp[n];
};

// 降维：
// f(n) = (f(n − 1) + t) % n
//      = (f(n − 1) + m % n) % n
//      = (f(n − 1) + m) % n
// 假设有函数 f(n) 表示 n 个人最终剩下人的编号
// f(n) = (m + f(n - 1)) % n
// f(1) = 0
var lastRemaining = function (n, m) {
  let ans = 0;
  for (let i = 2; i <= n; i++) {
    ans = (ans + m) % i;
  }
  return ans;
};
