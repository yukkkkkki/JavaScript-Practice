/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
// 方法一：广度优先搜索 BFS
var countSubIslands = function (grid1, grid2) {
  const m = grid1.length;
  const n = grid1[0].length;
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  const bfs = (i, j) => {
    const queue = [[i, j]];
    grid2[i][j] = 0;
    // 判断岛屿包含的每一个格子是否都在 grid1 中出现了
    let check = grid1[i][j];

    while (queue.length) {
      let [x, y] = queue.shift();

      for (let dir of dirs) {
        let dx = x + dir[0];
        let dy = y + dir[1];

        if (dx >= 0 && dx < m && dy >= 0 && dy < n && grid2[dx][dy] === 1) {
          queue.push([dx, dy]);
          grid2[dx][dy] = 0;

          if (grid1[dx][dy] !== 1) check = false;
        }
      }
    }
    return check;
  };

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid2[i][j] === 1) {
        res += bfs(i, j);
      }
    }
  }
  return res;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
