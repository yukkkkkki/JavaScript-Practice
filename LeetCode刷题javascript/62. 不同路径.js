// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

// 问总共有多少条不同的路径？

// 示例 1:

// 输入: m = 3, n = 2
// 输出: 3
// 解释:
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向右 -> 向下
// 2. 向右 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向右

// 示例 2:

// 输入: m = 7, n = 3
// 输出: 28

//  方法一：动态规划
// 时间复杂度：O(m*n)
// 机器人只能向右或向下移动一步
// 那么从左上角到右下角的走法 = 从右边开始走的路径总数 + 从下边开始走的路径总数
// 所以可推出动态方程为
// dp[i][j] = dp[i-1][j]+dp[i][j-1]
// 初始化第一行和第一列的值
// dp[0][j] = 1，dp[i][0] = 1
// 因为一直向下或者一直向右走而不转向的话只有一种走法
var uniquePaths = function (m, n) {
  const dp = new Array(m).fill().map(() => new Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// 优化
// 减少空间复杂度：O(2n)
// 分析
// 由解法一可知：从左上角到右下角的走法 = 从右边开始走的路径总数 + 从下边开始走的路径总数
// 下一行的值 = 当前行的值+上一行的值
//     dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
//     <=> dp[j] = dp[j] + dp[j - 1]
// 此时的dp[j - 1]代表上一阶段dp[j]的值
// 即仅仅维护递推状态的最后两个状态
var uniquePaths = function (m, n) {
  // 都初始化为1，就不用判断边界值了
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1];
    }
  }
  return dp[n - 1];
};

// 方法二：排列组合
var uniquePaths = function (m, n) {
  var N = n + m - 2;
  var k = m - 1;
  var result = 1;
  for (var i = 1; i <= k; i++) {
    result = (result * (N - k + i)) / i;
  }
  return result;
};
