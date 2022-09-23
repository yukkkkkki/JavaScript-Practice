/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：先 DFS，再用 BFS
function shortestBridge(grid) {
  const n = grid.length;
  const m = grid[0].length;

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];
  const queue = [];
  const dfs = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] !== 1) return;

    grid[i][j] = 2; // 标记小岛 2
    queue.push([i, j]);
    for (let [x, y] of dirs) {
      dfs(i + x, j + y);
    }
  };

  const bfs = () => {
    let step = 0;

    while (queue.length) {
      let size = queue.length;
      step++;

      while (size--) {
        const [x, y] = queue.shift();

        // 出队列向四周扩散
        for (let dir of dirs) {
          const dx = x + dir[0];
          const dy = y + dir[1];
          if (dx >= 0 && dx < n && dy >= 0 && dy < m) {
            if (grid[dx][dy] === 1) {
              return step - 1;
            } else if (grid[dx][dy] === 0) {
              grid[dx][dy] = 2;
              queue.push([dx, dy]);
            }
          }
        }
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        return bfs();
      }
    }
  }

  return -1;
}
