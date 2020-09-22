// 硬币。给定数量不限的硬币，币值为25分、10分、5分和1分，编写代码计算n分有几种表示法。(结果可能会很大，你需要将结果模上1000000007)

// 示例1:
//  输入: n = 5
//  输出：2
//  解释: 有两种方式可以凑成总金额:
// 5=5
// 5=1+1+1+1+1

// 示例2:
//  输入: n = 10
//  输出：4
//  解释: 有四种方式可以凑成总金额:
// 10=10
// 10=5+5
// 10=5+1+1+1+1+1
// 10=1+1+1+1+1+1+1+1+1+1

// 方法一：动态规划
// 思路：
// 用 f(i, v) 来表示前 i 种面值的硬币构成面值为 v 的方案数量，用 c_i 来表示第 i 种面值的硬币的面值
// 动态转移方程
// f(i, v) = f(i - 1, v) + f(i, v - ci)
var waysToChange = function (n) {
  let mod = 1e9 + 7;
  const coins = [1, 5, 10, 25];
  const dp = [Array(n + 1).fill(1)];
  for (let i = 1; i < n + 1; i++) {
    dp[i] = Array(coins.length + 1).fill(0);
    for (let j = 1; j < coins.length + 1; j++) {
      if (i - coins[j - 1] >= 0) {
        dp[i][j] = (dp[i][j - 1] + dp[i - coins[j - 1]][j]) % mod; // 由于可以重复使用硬币所以这里是j不是j-1
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  // console.log(dp);
  return dp[n][coins.length];
};

// 空间优化：降维成一维数组
var waysToChange = function (n) {
  let mod = 1e9 + 7;
  const coins = [1, 5, 10, 25];
  let dp = new Array(n + 1).fill(1);
  for (let i = 1; i < coins.length; i++) {
    for (let j = 1; j <= n; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = (dp[j] + dp[j - coins[i]]) % mod;
      }
    }
  }
  // console.log(dp);
  return dp[n];
};

console.log(waysToChange(5));
