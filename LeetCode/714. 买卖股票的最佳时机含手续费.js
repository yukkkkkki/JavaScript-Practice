// 给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。

// 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

// 返回获得利润的最大值。

// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

// 示例 1:
// 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出: 8
// 解释: 能够达到的最大利润:
// 在此处买入 prices[0] = 1
// 在此处卖出 prices[3] = 8
// 在此处买入 prices[4] = 4
// 在此处卖出 prices[5] = 9
// 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

// 注意:
// 0 < prices.length <= 50000.
// 0 < prices[i] < 50000.
// 0 <= fee < 50000.

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// 方法一：动态规划
// dp[i][0] 表示第i天交易完后手里没有股票的最大利润
// dp[i][1]表示第i天交易完后手里持有一支股票的最大利润
// dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
// dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])
var maxProfit = function (prices, fee) {
  const n = prices.length;
  const dp = new Array(n).fill(0).map((v) => new Array(2).fill(0));
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[n - 1][0];
};
// 时间复杂度：O(n); 空间复杂度：o(n)
// 优化
var maxProfit = function (prices, fee) {
  const n = prices.length;
  let [sell, buy] = [0, -prices[0]];
  for (let i = 1; i < n; i++) {
    [sell, buy] = [
      Math.max(sell, buy + prices[i] - fee),
      Math.max(buy, sell - prices[i]),
    ];
  }
  return sell;
};

// 方法二：贪心算法：
var maxProfit = function (prices, fee) {
  const n = prices.length;
  let buy = prices[0] + fee;
  let profit = 0;
  for (let i = 1; i < n; i++) {
    if (prices[i] + fee < buy) {
      buy = prices[i] + fee;
    } else if (prices[i] > buy) {
      profit += prices[i] - buy;
      buy = prices[i];
    }
  }
  return profit;
};
// 时间复杂度：O(n)
// 空间复杂度：o(1)
