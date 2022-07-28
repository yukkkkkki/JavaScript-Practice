/**
 * @param {number[][]} triangle
 * @return {number}
 */
// 方法一：动态规划 自底向上
var minimumTotal = function (triangle) {
  let dp = triangle;

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + dp[i][j];
    }
  }

  return dp[0][0];
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n^2)

// 降维：
var minimumTotal = function (triangle) {
  let dp = new Array(triangle.length + 1).fill(0);
  for (let i = triangle.length - 1; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }

  return dp[0];
};
