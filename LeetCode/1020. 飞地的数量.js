/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：深度优先搜索
// 从网格边界上的每个陆地单元格开始深度优先搜索，遍历完边界之后，所有和网格边界相连的陆地单元格就都被访问过了
// 然后遍历整个网格，如果网格中的一个陆地单元格没有被访问过，则该陆地单元格不和网格的边界相连，是飞地
var numEnclaves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  let dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  const dfs = (i, j) => {
    if (
      i < 0 ||
      i >= m ||
      j < 0 ||
      j >= n ||
      grid[i][j] == 0 ||
      visited[i][j]
    ) {
      return;
    }

    visited[i][j] = true;
    for (const dir of dirs) {
      dfs(i + dir[0], j + dir[1]);
    }
  };

  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 1; j < n - 1; j++) {
    dfs(0, j);
    dfs(m - 1, j);
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
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)

// 方法二：广度优先搜索
var numEnclaves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  const queue = [];
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) {
      visited[i][0] = true;
      queue.push([i, 0]);
    }
    if (grid[i][n - 1] === 1) {
      visited[i][n - 1] = true;
      queue.push([i, n - 1]);
    }
  }
  for (let j = 1; j < n - 1; j++) {
    if (grid[0][j] === 1) {
      visited[0][j] = true;
      queue.push([0, j]);
    }
    if (grid[m - 1][j] === 1) {
      visited[m - 1][j] = true;
      queue.push([m - 1, j]);
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (const dir of dirs) {
      const dx = x + dir[0];
      const dy = y + dir[1];

      if (
        dx >= 0 &&
        dx < m &&
        dy >= 0 &&
        dy < n &&
        grid[dx][dy] == 1 &&
        !visited[dx][dy]
      ) {
        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }
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
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
