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

// 方法一：动态规划-自底向上
// DP：重复性(分治)
//     problem(i,j) = min(sub(i+1,j) , sub(i+1,j+1)) + a[i,j]
//         problem(i,j)：当前行当前列（二维数组）的向下面走的路径总数
//         sub(i+1,j)：下一行当前列(即向下并向左边走)的路径总数
//         sub(i+1,j+1)：下一行下一列(即向下并向右边走)的路径总数
//         路径总数包括自己所在位置a[i,j]，即到达当前位置所需的步数
// 定义状态数组
//     dp[i,j]
// DP方程
//     dp[i,j] = min(dp[i+1,j],dp[i+1][j+1])+dp[i,j]
// 初始化数据
//     一般是第一行n列和第一列n行或者最后一行n列最后一列n行
//     但题中本意就是为了比较相邻数字和的大小，直接用原题的数据，最后一行n列即可对推到起点。
// 作者：Alexer-660
// 链接：https://leetcode-cn.com/problems/triangle/solution/120-san-jiao-xing-zui-xiao-lu-jing-he-by-alexer-66/
var minimumTotal = function (triangle) {
  let dp = triangle;
  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + dp[i][j];
    }
  }
  return dp[0][0];
};

// 优化版
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
// 空间复杂度：O(n)
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
