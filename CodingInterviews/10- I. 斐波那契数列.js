/**
 * @param {number} n
 * @return {number}
 */
// 方法一
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 1;
  let b = 0;
  for (let i = 1; i < n; i++) {
    let t = b;
    b = a;
    a = (t + a) % 1000000007;
  }

  return a;
};

// 方法二：动态规划
var fib = function (n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (1e9 + 7);
  }
  return dp[n];
};
