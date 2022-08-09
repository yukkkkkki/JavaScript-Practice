/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
//  方法一：动态规划
// 机器人只能向右或向下移动一步，那么从左上角到右下角的走法 = 从右边开始走的路径总数 + 从下边开始走的路径总数
// 所以动态方程为：dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
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
// 时间复杂度：O(m*n)
// 空间复杂度：O(m*n)

// 优化
// 下一行的值 = 当前行的值 + 上一行的值
//  dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
//  <=> dp[j] = dp[j] + dp[j - 1]
// 此时的 dp[j - 1]代表上一阶段dp[j]的值
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
// 空间复杂度：O(2n)

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
