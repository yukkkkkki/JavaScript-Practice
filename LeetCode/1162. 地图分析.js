/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：广度优先搜搜 BFS
var maxDistance = function (grid) {
  let n = grid.length;
  let res = -1;
  let dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
  ];

  let queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 将所有陆地加入队列，而不是海洋，陆地不断扩展到海洋
      if (grid[i][j] == 1) queue.push([i, j]);
    }
  }

  if (!queue.length || queue.length === n * n) return res;

  while (queue.length) {
    let size = queue.length;

    for (let k = 0; k < size; k++) {
      let [x, y] = queue.shift();

      for (let dir of dirs) {
        let dx = x + dir[0];
        let dy = y + dir[1];

        // 合法且是海洋
        if (dx >= 0 && dx < n && dy >= 0 && dy < n && grid[dx][dy] == 0) {
          grid[dx][dy] = 1; // 变为陆地
          queue.push([dx, dy]);
        }
      }
    }

    res++;
  }

  return res;
};
// 间复杂度：O(n^2)
// 空间复杂度：O(n^2)
