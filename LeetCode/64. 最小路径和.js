// 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

// 说明：每次只能向下或者向右移动一步。

// 示例:
// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。

// 方法一：动态规划
// 记录到达每一格时最小的路径
// 到记录到 dp[m][n]时就是需要的结果
// 到达每一格的路径和可能有两种
//     从上面单元格进入则：dp[i][j] = dp[i][j-1]+grid[i][j]
//     从上面单元格进入则：dp[i][j] = dp[i-1][j]+grid[i][j]
// 索引存在-1 则需要注意边界问题：
//     grid 长 0，返回 0
//     dp[0][0] = grid[0][0]
// 遍历从 i=1,j=1 开始
//     dp[i][0],dp[0][j],使用当前行或者列累加做默认值
var minPathSum = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  if (m == 0 || n == 0) return 0;
  let dp = new Array(m).fill().map(() => new Array(n).fill(Number.MAX_VALUE));

  dp[0][0] = grid[0][0];

  // 补齐首行路径和
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 补齐首列路径和
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(
        dp[i][j],
        Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      );
    }
  }

  return dp[m - 1][n - 1];
};

// 方法二：降维优化
var minPathSum = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  if (m == 0 || n == 0) return 0;
  let dp = new Array(n).fill(0);

  dp[0] = grid[0][0];

  // 补齐首列路径和
  for (let j = 1; j < n; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    // 开始每列循环时限初始化本列起点路径和，到达本列前的路径和
    dp[0] = dp[0] + grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }

  return dp[n - 1];
};

// 方法三：原地DP
// 解题思路
//   原地DP，dp二维数组直接就用grid矩阵
//   grid[i][j]：到达grid[i][j]处，经历的最小路径和
//   状态转移方程：grid[i][j] = grid[i][j] + min(grid[i - 1][j], grid[i][j - 1])
//   base case 是第0行和第0列的情况
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) {
        continue;
      } else if (i == 0) {
        grid[i][j] = grid[i][j] + grid[i][j - 1];
      } else if (j == 0) {
        grid[i][j] = grid[i][j] + grid[i - 1][j];
      } else {
        grid[i][j] = grid[i][j] + Math.min(grid[i][j - 1], grid[i - 1][j]);
      }
    }
  }
  return grid[m - 1][n - 1];
};
