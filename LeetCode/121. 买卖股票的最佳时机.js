/**
 * @param {number[]} prices
 * @return {number}
 */
// 方法一：动态规划
// dp[i] = Math.max(dp[i - 1], prices[i] - minPrice)
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;

  const n = prices.length;
  const dp = new Array(n).fill(0);
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
  }

  return dp[n - 1];
};

// dp优化版
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;
  const n = prices.length;

  let profit = 0;
  let minPrice = prices[0];

  for (let i = 1; i < n; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    profit = Math.max(profit, prices[i] - minPrice);
  }

  return profit;
};
