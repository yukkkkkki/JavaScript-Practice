// 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
// 相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。

// 例如，给定三角形：
// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
/**
 * @param {number[][]} triangle
 * @return {number}
 */
// 方法一：动态规划-自底向上
// 定义状态数组 dp[i, j]
// DP方程：dp[i, j] = min(dp[i + 1, j], dp[i + 1][j + 1]) + dp[i, j]
// 参考：https://leetcode-cn.com/problems/triangle/solution/120-san-jiao-xing-zui-xiao-lu-jing-he-by-alexer-66/
var minimumTotal = function (triangle) {
  let dp = triangle;
  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + dp[i][j];
    }
  }
  return dp[0][0];
};

// 优化
var minimumTotal = function (triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] =
        Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return triangle[0][0];
};

// 方法二：动态规划-自底向上-降维
// 自底向上递归时，其实每次只会用到上一层数据，因此不需二维数组存储所有可能情况来一一比较
var minimumTotal = function (triangle) {
  let dp = new Array(triangle.length + 1).fill(0);
  for (let i = triangle.length - 1; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }
  return dp[0];
};
// 空间复杂度：O(n)
