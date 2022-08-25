/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
// 方法一：深度优先搜索 DFS
var pacificAtlantic = function (heights) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const m = heights.length;
  const n = heights[0].length;

  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  // 实现反向搜索
  // 搜索过程中需要记录每个单元格是否可以从太平洋反向到达以及是否可以从大西洋反向到达
  const dfs = (row, col, ocean) => {
    if (ocean[row][col]) return;

    ocean[row][col] = true;

    for (const dir of dirs) {
      const newRow = row + dir[0];
      const newCol = col + dir[1];
      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        heights[newRow][newCol] >= heights[row][col]
      ) {
        dfs(newRow, newCol, ocean);
      }
    }
  };

  // 从矩阵的左边界和上边界开始反向搜索即可找到雨水流向太平洋的单元格
  for (let i = 0; i < m; i++) dfs(i, 0, pacific);
  for (let j = 1; j < n; j++) dfs(0, j, pacific);
  // 从矩阵的右边界和下边界开始反向搜索即可找到雨水流向大西洋的单元格
  for (let i = 0; i < m; i++) dfs(i, n - 1, atlantic);
  for (let j = 0; j < n - 1; j++) dfs(m - 1, j, atlantic);

  const result = [];
  // 遍历每个网格
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果一个网格既可以从太平洋反向到达也可以从大西洋反向到达
      // 则该网格满足太平洋和大西洋都可以到达，将该网格添加到答案中
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)

// 方法二：深度优先搜索 DFS
const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];
var pacificAtlantic = function (heights) {
  m = heights.length;
  n = heights[0].length;

  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  const bfs = (row, col, ocean) => {
    if (ocean[row][col]) return;
    ocean[row][col] = true;

    const queue = [[row, col]];

    while (queue.length) {
      const cell = queue.shift();

      for (const dir of dirs) {
        const newRow = cell[0] + dir[0];
        const newCol = cell[1] + dir[1];
        if (
          newRow >= 0 &&
          newRow < m &&
          newCol >= 0 &&
          newCol < n &&
          heights[newRow][newCol] >= heights[cell[0]][cell[1]] &&
          !ocean[newRow][newCol]
        ) {
          ocean[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  for (let i = 0; i < m; i++) bfs(i, 0, pacific);
  for (let j = 1; j < n; j++) bfs(0, j, pacific);
  for (let i = 0; i < m; i++) bfs(i, n - 1, atlantic);
  for (let j = 0; j < n - 1; j++) bfs(m - 1, j, atlantic);

  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }
  return result;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
