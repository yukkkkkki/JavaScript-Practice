// 数组的每个索引作为一个阶梯，第 i个阶梯对应着一个非负数的体力花费值 cost[i](索引从0开始)。
// 每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。
// 您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。

// 示例 1:
// 输入: cost = [10, 15, 20]
// 输出: 15
// 解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。

// 示例 2:
// 输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
// 输出: 6
// 解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。

// 方法一：动态规划-分解
// 思路：dp[i]表示达到下标 i 的最小花费。
// 可以选择下标0或1作为初始阶梯，因此dp[0] = dp[1] = 0
// 动态转移方程：当2 <= i <= n
// dp[i] = Math.min(dp[i - 1] + cost[i - 1] , dp[i - 2] + cost[i - 2])
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  let dp = new Array(n + 1);
  dp[0] = dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
};

// 方法二：动态规划-合并
// 由解法一可知：有最后一阶台阶不算的情况在内，所以直接在最后加一个0(表示包含在这种特殊情况在内)
// 这样动态转移方程就不用变了
// dp[i] = Math.min(dp[i-2] , dp[i-1]) + cost[i]
var minCostClimbingStairs = function (cost) {
  cost.push(0);
  const n = cost.length;
  let dp = new Array(n);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return dp[n - 1];
};

// 方法三：动态规划-比较
// 唯一不同的情况是最后一阶的台阶的花费值是否被算在内
// 那么统一加最后一阶台阶，只在最后取结果的时候比较判断去掉最后一个台阶的走法情况是否花费更少即可
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  let dp = new Array(n);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return dp[n - 1] > dp[n - 2] ? dp[n - 2] : dp[n - 1];
};

// 方法四：动态规划-降维
// 作者：Alexer-660
// 链接：https://leetcode-cn.com/problems/min-cost-climbing-stairs/solution/746-shi-yong-zui-xiao-hua-fei-pa-lou-ti-by-alexer-/
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  let pre = cost[0];
  let next = cost[1];
  for (let i = 2; i < n; i++) {
    let tmp = next;
    next = Math.min(pre, next) + cost[i];
    pre = tmp;
  }
  return Math.min(pre, next);
};
