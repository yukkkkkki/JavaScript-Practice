// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

// 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

// 注意：你不能在买入股票前卖出股票。

// 示例 1:
// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

// 示例 2:
// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

// 方法一：暴力法
// 数组中两个数字的最大差值即为最大利润maxprofit
// 比较差值求出max(prices[j] - prices[i]) (j > i)
var maxProfit = function (prices) {
  let max = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let p = prices[j] - prices[i];
      if (p > max) max = p;
    }
  }
  return max;
};
// 时间复杂度：O(n^2); 空间复杂度:O(1)

// 方法二：一次遍历法
var maxProfit = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER;
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      max = Math.max(max, prices[i] - minPrice);
    }
  }
  return max;
};

// 方法三：dp粗糙版
var maxProfit = function (prices) {
  if (prices.length <= 1) return 0;
  let diff = [];
  for (let i = 0; i < prices.length - 1; i++) {
    diff[i] = prices[i + 1] - prices[i];
  }

  let dp = new Array(prices.length).fill(0);
  dp[0] = Math.max(0, diff[0]);
  let max = dp[0];
  for (let i = 1; i < diff.length; i++) {
    dp[i] = Math.max(0, dp[i - 1] + diff[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
};

// 方法四：dp优化版
var maxProfit = function (prices) {
  let last = 0;
  let max = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    last = Math.max(0, last + prices[i + 1] - prices[i]);
    max = Math.max(max, last);
  }
  return max;
};
