/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 方法一：动态规划
// f[i] 为组成金额 i 所需最少的硬币数量
// f[i] = min f[i - cj] + 1
//    j = 0...n-1
// 示例：
// coins = [1, 2, 5], amount = 11
// f[0]  -> 0
// f[1]  -> 1 // f[1] = min(f[1 - 1], f[1 - 2], f[1 - 5]) + 1 = 1;
// f[2]  -> 1 // F(2) = min(f[2 − 1], f[2 − 2], f[2 − 5]) + 1 = 1
// f[3]  -> 2 // f(3) = min(f[3 − 1], f[3 − 2], f[3 − 5]) + 1 = 2
// f[4]  -> 2 // f(4) = min(f[4 − 1], f[4 − 2], f[4 − 5]) + 1 = 2
// ...
// f[11] -> 3 // f[11] = min(f[11 - 1], f[11 - 2], f[11 - 5]) + 1 = 3
var coinChange = function (coins, amount) {
  let max = amount + 1;
  const dp = new Array(amount + 1).fill(max);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        // 组成金额 i 所需最少的硬币数量
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
};
// 时间复杂度：O(Sn) S 是金额，n 是面额数
// 空间复杂度：O(S)
