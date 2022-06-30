/**
 * @param {number[]} prices
 * @return {number}
 */
// 方法一：贪心法
var maxProfit = function (prices) {
  let money = 0;
  for (let i = 1; i < prices.length; i++) {
    money += Math.max(0, prices[i] - prices[i - 1]);
  }
  return money;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：峰谷法
var maxProfit = function (prices) {
  let valley = prices[0]; // 峰值
  let peak = prices[0]; // 谷值
  let res = 0;
  const n = prices.length;

  let i = 0;
  while (i < n - 1) {
    // 找波谷
    while (i < n - 1 && prices[i] >= prices[i + 1]) {
      i++;
    }
    valley = prices[i];

    // 找波峰
    while (i < n - 1 && prices[i] <= prices[i + 1]) {
      i++;
    }
    peak = prices[i];
    res += peak - valley;
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法三：动态规划
// dp[i][0]：第 i 天交易完后手里没有股票的最大利润
// dp[i][1]：表示第 i 天交易完后手里持有一支股票的最大利润
// 状态转移方程：
// dp[i][0] = max{dp[i − 1][0], dp[i − 1][1] + prices[i]}
// dp[i][1] = max{dp[i − 1][1], dp[i − 1][0] − prices[i]}
var maxProfit = function (prices) {
  const n = prices.length;
  const dp = new Array(n).fill(0).map((v) => new Array(2).fill(0));
  // 初始化
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[n - 1][0];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
// 降维：
var maxProfit = function (prices) {
  const n = prices.length;
  dp0 = 0;
  dp1 = -prices[0];

  for (let i = 1; i < n; i++) {
    let newDp0 = Math.max(dp0, dp1 + prices[i]);
    let newDp1 = Math.max(dp1, dp0 - prices[i]);
    dp0 = newDp0;
    dp1 = newDp1;
  }

  return dp0;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
