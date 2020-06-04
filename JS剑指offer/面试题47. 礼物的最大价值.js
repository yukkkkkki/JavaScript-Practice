// 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

// 示例 1:
// 输入: 
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 12
// 解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物

// 动态规划
// 当前格子的总礼物价值，至于格子(i-1, j)和(i,j-1)有关
// f(i,j) = max(f(i, j-1), f(i-1, j)) + grid[i][j]
var maxValue = function (grid) {
  if (!grid) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const res = new Array(rows).fill(new Array(cols).fill(0));
  // console.log(res)

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let left = 0,
        up = 0;
      if (i > 0) up = res[i - 1][j];
      if (j > 0) left = res[i][j - 1];

      res[i][j] = Math.max(up, left) + grid[i][j];
    }
  }
  return res[rows - 1][cols - 1];
};

// 优化：用一维数组代替之前的res
var maxValue = function (grid) {
  if (!grid) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const res = new Array(cols).fill(0);

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let left = 0,
        up = 0;
      if (i > 0) up = res[j]
      if (j > 0) left = res[j - 1];

      res[j] = Math.max(up, left) + grid[i][j];
    }
  }
  return res[cols - 1];
};