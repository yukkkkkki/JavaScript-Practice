// 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。

// 示例 1:
// 输入: amount = 5, coins = [1, 2, 5]
// 输出: 4
// 解释: 有四种方式可以凑成总金额:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1

// 示例 2:
// 输入: amount = 3, coins = [2]
// 输出: 0
// 解释: 只用面额2的硬币不能凑成总金额3。

// 示例 3:
// 输入: amount = 10, coins = [10]
// 输出: 1

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// 方法一：动态规划
// 思路
// dp[i][j] = x 表示对于前i个物品，当背包容量为j时，此时最多有X种装法
// 即,只使用coins中的前i个硬币的面值，想凑出金额j，有x种凑法
// 状态转移:
// 若把第i个物品装入背包，此时 dp[i][j] = dp[i][j - coins[i - 1]]
// 若不把第i个物品装入背包，此时 dp[i][j] = dp[i - 1][j]，表示和之前状态的结果一样
// 状态转移伪代码：
// if j - coins[i - 1] < 0
//    dp[i][j] = dp[i - 1][j]
// else
//    dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];

// base case
// dp[0][...] = 0，若不使用任何硬币面值，即0种凑法
// dp[...][0] = 1，若要凑出的目标金额为0，那么有唯一的一种凑法
var change = function (amount, coins) {
  const n = coins.length;
  const dp = [];
  // 初始化
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= amount; j++) {
      if (i === 0) dp[0][j] = 0;
      if (j === 0) dp[i][0] = 1;
      else dp[i][j] = 0;
    }
  }

  // 做选择
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      }
    }
  }
  return dp[n][amount];
};

// 降维
var change = function (amount, coins) {
  const n = coins.length;
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let coin of coins) {
    for (let i = 1; i <= amount; i++) {
      if (i - coin >= 0) {
        dp[i] = dp[i] + dp[i - coin];
      }
    }
  }
  return dp[dp.length - 1];
};
