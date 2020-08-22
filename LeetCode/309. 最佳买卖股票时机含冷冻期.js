// 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

//     你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//     卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

// 示例:
// 输入: [1,2,3,0,2]
// 输出: 3
// 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

// 方法一:动态规划
// 状态转移
//     hold[i] : 在第 i 天的结束时，手中持有股票，此时的最大收益
//         分为两种情况：今天休息或者买了股票
//         可能是昨天持有了，今天休息，也可能是前天卖了，今天买的
//         hold[i] = Math.max(hold[i - 1], unhold[i - 2] - prices[i])
//     unhold[i] : 第 i 天的结束时，手中没有股票，此时的最大收益
//         分为两种情况：今天休息或者卖了股票
//         可能是昨天也没持有，今天休息，也可能是昨天持有，今天卖了
//         unhold[i] = Math.max(unhold[i - 1], hold[i - 1] + prices[i])
//     目标是求 unhold[n-1] ( n：0 1 2 3 ... )

// base case
//     hold[0] = -prices[0] 第0天买股票，收益-prices[0]元
//     hold[1] = Math.max(-prices[0], -prices[1]) 第1天持有着股票，可能是昨天买的，今天休息，也可能是昨天休息，今天买的
//     unhold[0] = 0 第0天没有持有股票，就是休息，收益 0 元

// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dp-zhuang-tai-de-ding-yi-you-liang-chong-fang-fa-b/
var maxProfit = function (prices) {
  const n = prices.length;
  if (n == 0) return 0;
  let hold = new Array(n); // 第i天持有股票的最大收益
  let unhold = new Array(n); // 第i天不持有股票的最大收益
  hold[0] = -prices[0]; // 第0天 买了股票的收益
  unhold[0] = 0;
  for (let i = 1; i < n; i++) {
    if (i == 1) {
      hold[i] = Math.max(hold[i - 1], -prices[1]);
    } else {
      hold[i] = Math.max(hold[(i - 1, unhold[i - 2] - prices[i])]);
    }
    unhold[i] = Math.max(unhold[i - 1], hold[i - 1] + prices[i]);
  }
  return unhold[n - 1];
};

// 方法二：状态机
// 对于每一天有三种状态：
//     S0: 手中没持有，可以买
//     S1: 手中持有，可以卖
//     S2: 手中没持有，买不了
var maxProfit = function (prices) {
  let rest = 0;
  let sold = 0;
  let hold = -Infinity;
  for (let price of prices) {
    let preSold = sold;
    let preHold = hold;
    hold = Math.max(preHold, rest - price);
    sold = preHold + price;
    rest = Math.max(rest, preSold);
  }
  return Math.max(rest, sold);
};
