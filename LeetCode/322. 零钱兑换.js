/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：此时兑换的硬币数
// dp[i] = Math.min(dp[i], dp[i - coin] + 1)
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 面额 0只需要 0个硬币兑换

  // 循环面额
  for (let i = 1; i <= amount; i++) {
    // 循环硬币数组
    for (let coin of coins) {
      // 当面额大于硬币价值时
      if (i - coin >= 0) {
        // dp[i - coin]：当前面额 i 减当前硬币价值所需要的最少硬币
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};
// 时间复杂度：O(Sn)。 S 是金额，n 是面额数
// 空间复杂度：O(S)。 数组 dp 需要开长度为总金额 S 的空间
