/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：广度优先搜素 BFS
var shortestPathBinaryMatrix = function (grid) {
  const m = grid.length - 1;
  if (grid[0][0] === 1 || grid[m][m] === 1) return -1;
  if (m === 0) return 1;

  let dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1]
  ];
  let queue = [[0, 0]];
  grid[0][0] = 1; // 走过的路都标记为 1
  let depth = 0;

  while (queue.length) {
    depth++;
    let size = queue.length;

    while (size--) {
      let [x, y] = queue.shift();
      if (x === m && y === m) return depth;
      for (let dir of dirs) {
        let dx = x + dir[0];
        let dy = y + dir[1];

        if (dx < 0 || dx > m || dy < 0 || dy > m || grid[dx][dy] === 1) {
          continue;
        }

        queue.push([dx, dy]);
        grid[dx][dy] = 1;
      }
    }
  }

  return -1;
};
