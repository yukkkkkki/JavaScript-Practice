/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：DFS
var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let max = 0;
  let area = 0;

  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return;
    }
    area++;
    // 每次经过一块土地时，将这块土地的值置为 0，这样就不会多次访问同一土地
    grid[i][j] = 0;
    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i, j - 1);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        area = 0;
        dfs(i, j);
        max = Math.max(max, area);
      }
    }
  }

  return max;
};
