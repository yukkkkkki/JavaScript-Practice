/**
 * @param {number} n
 * @return {number}
 */
// 方法一：动态规划
var numWays = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
  }
  return dp[n];
};

// 方法二
var numWays = function (n) {
  if (n <= 0) return 1;
  if (n <= 2) return n;
  let i = 2,
    cur = 2,
    pre = 1,
    res = 0;
  while (i++ < n) {
    res = (pre + cur) % 1000000007;
    pre = cur;
    cur = res;
  }
  return res;
};
