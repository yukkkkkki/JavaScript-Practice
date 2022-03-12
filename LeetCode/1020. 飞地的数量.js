/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：深度优先搜索
// 从网格边界上的每个陆地单元格开始深度优先搜索，遍历完边界之后，所有和网格边界相连的陆地单元格就都被访问过了
// 然后遍历整个网格，如果网格中的一个陆地单元格没有被访问过，则该陆地单元格不和网格的边界相连，是飞地
var numEnclaves = function (grid) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  const dfs = (grid, row, col) => {
    if (
      row < 0 ||
      row >= m ||
      col < 0 ||
      col >= n ||
      grid[row][col] == 0 ||
      visited[row][col]
    ) {
      return;
    }

    visited[row][col] = true;
    for (const dir of dirs) {
      dfs(grid, row + dir[0], col + dir[1]);
    }
  };

  for (let i = 0; i < m; i++) {
    dfs(grid, i, 0);
    dfs(grid, i, n - 1);
  }

  for (let j = 1; j < n - 1; j++) {
    dfs(grid, 0, j);
    dfs(grid, m - 1, j);
  }

  let enclaves = 0;
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        enclaves++;
      }
    }
  }
  return enclaves;
};
