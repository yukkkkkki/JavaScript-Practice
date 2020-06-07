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

// 方法一
var maxProfit = function (prices) {
  let res = 0;
  let min = prices[0];
  const len = prices.length;
  for (let i = 1; i < len; i++) {
    min = Math.min(min, prices[i]);
    res = Math.max(res, prices[i] - min);
  }
  return res;
}

// 方法二
var maxProfit = function (prices) {
  let max = 0;
  for (let i = prices.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (prices[i] - prices[j] > 0 && prices[i] - prices[j] > max) {
        max = prices[i] - prices[j];
      }
    }
  }
  return max;
};