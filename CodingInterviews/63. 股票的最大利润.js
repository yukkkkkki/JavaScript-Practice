/**
 * @param {number[]} prices
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：以 prices[i] 为结尾的子数组的最大利润
// dp[i] = Math.max(dp[i - 1], prices[i] - minPrice)
var maxProfit = function (prices) {
  const n = prices.length;
  if (n == 0) return 0;

  const dp = new Array(n).fill(0);
  let minPrice = prices[0];

  for (let i = 1; i < n; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
  }

  return dp[n - 1];
};

// 方法二：动态规划降维
var maxProfit = function (prices) {
  let maxDiff = 0; // 表示当前价格卖出股票的最大获利
  let min = prices[0]; // 记录之前 i-1个数字中的最小值

  for (let i = 1; i < prices.length; i++) {
    min = Math.min(prices[i], min);
    maxDiff = Math.max(maxDiff, prices[i] - min);
  }

  return maxDiff;
};
// console.log(maxProfit([7, 6, 4, 3, 1]));
