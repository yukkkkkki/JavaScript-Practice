/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
// 方法一：深度优先搜索
// 从一个单元格开始，通过搜索的方法模拟雨水的流动，则可以判断雨水是否可以从该单元格流向海洋。
// 如果直接以每个单元格作为起点模拟雨水的流动，则会重复遍历每个单元格，导致时间复杂度过高。
// 为了降低时间复杂度，可以从矩阵的边界开始反向搜索寻找雨水流向边界的单元格，反向搜索时，每次只能移动到高度相同或更大的单元格

// 由于矩阵的左边界和上边界是太平洋，矩阵的右边界和下边界是大西洋，因此从矩阵的左边界和上边界开始反向搜索，即可找到雨水流向太平洋的单元格，从矩阵的右边界和下边界开始反向搜索即可找到雨水流向大西洋的单元格。
// 搜索过程中，需要记录每个单元格是否可以从太平洋反向到达，以及是否可以从大西洋反向到达。
// 反向搜索结束之后，遍历每个网格，如果一个网格既可以从太平洋反向到达也可以从大西洋反向到达，则该网格满足太平洋和大西洋都可以到达，将该网格添加到答案中
var pacificAtlantic = function (heights) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const m = heights.length;
  const n = heights[0].length;

  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  const dfs = (row, col, ocen) => {
    if (ocen[row][col]) return;

    ocen[row][col] = true;
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
        dfs(newRow, newCol, ocen);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific);
  }
  for (let j = 1; j < n; j++) {
    dfs(0, j, pacific);
  }
  for (let i = 0; i < m; i++) {
    dfs(i, n - 1, atlantic);
  }
  for (let j = 0; j < n - 1; j++) {
    dfs(m - 1, j, atlantic);
  }

  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        const cell = [];
        cell.push(i);
        cell.push(j);
        result.push(cell);
      }
    }
  }

  return result;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
