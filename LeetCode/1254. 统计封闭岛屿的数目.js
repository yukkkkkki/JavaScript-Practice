/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
var closedIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];
  const dfs = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] === 1) {
      return;
    }
    // 淹没为海洋避免重复访问
    grid[i][j] = 1;
    for (let dir of dirs) {
      // 扩散到四面八方
      dfs(i + dir[0], j + dir[1]);
    }
  };

  // 把四周的岛屿都淹成海洋
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (
        (i === 0 || i === n - 1 || j === 0 || j === m - 1) &&
        grid[i][j] === 0
      ) {
        dfs(i, j);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 如果是岛屿，则作为DFS的入口
      if (grid[i][j] === 0) {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
};
// 时间复杂度：O(nm)
// 空间复杂度：O(nm)

// 方法二：广度优先搜索 BFS
var closedIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];

  const bfs = (i, j) => {
    const queue = [[i, j]];

    while (queue.length) {
      let size = queue.length;
      for (let k = 0; k < size; k++) {
        let [x, y] = queue.shift();
        if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] === 1) {
          continue;
        }

        grid[x][y] = 1;
        for (let dir of dirs) {
          queue.push([x + dir[0], y + dir[1]]);
        }
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (
        (i === 0 || i === n - 1 || j === 0 || j === m - 1) &&
        grid[i][j] === 0
      ) {
        bfs(i, j);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 0) {
        bfs(i, j);
        count++;
      }
    }
  }
  return count;
};
// 时间复杂度：O(nm)
// 空间复杂度：O(nm)
