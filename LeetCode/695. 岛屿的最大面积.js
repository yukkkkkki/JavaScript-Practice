/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：DFS
var maxAreaOfIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  let res = 0;
  let area = 0;

  const dfs = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] === 0) {
      return;
    }

    area++;
    grid[i][j] = 0;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        area = 0;
        dfs(i, j);
        res = Math.max(res, area);
      }
    }
  }

  return res;
};
// 时间复杂度：O(m)
// 空间复杂度：O(n)

// 方法二：广度优先搜索 BFS
var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let res = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let cur = 0;

      let queue = [[i, j]];
      while (queue.length) {
        let [x, y] = queue.shift();
        if (x < 0 || x >= m || y < n || y >= n || grid[x][y] !== 1) {
          continue;
        }

        cur++;
        grid[x][y] = 0;

        let dirs = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ];
        for (let dir of dirs) {
          let dx = x + dir[0];
          let dy = y + dir[1];
          queue.push([dx, dy]);
        }
      }
      res = Math.max(res, cur);
    }
  }

  return res;
};
// 时间复杂度：O(m)
// 空间复杂度：O(n)
