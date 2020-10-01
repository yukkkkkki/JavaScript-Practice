// 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？

// 示例 1:
// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。

// 示例 2:
// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0

// 方法一：动态规划
// dp[i] = Math.max(dp[i - 1], prices[i] - minPrice)
var maxProfit = function (prices) {
  const n = prices.length;
  if (n == 0) return 0;
  const dp = new Array(n).fill(0);
  minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
  }
  return dp[n - 1];
};

// 方法二：动态规划降维
// 不用数组，用min来记录之前i-1个数字中的最小值
// 用maxDiff表示当前价格卖出股票的最大获利
var maxProfit = function (prices) {
  let maxDiff = 0;
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    min = Math.min(prices[i], min);
    maxDiff = Math.max(maxDiff, prices[i] - min);
  }
  return maxDiff;
};
// console.log(maxProfit([7, 6, 4, 3, 1]));
