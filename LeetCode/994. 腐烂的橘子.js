/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：广度优先搜索 BFS
// 记录 2 的位置到队列中，以他们为基础进行扩散（上下左右）
// 后续再将被扩散的节点记录到队列中 再进行扩散（广度搜索）
var orangesRotting = function (grid) {
  let m = grid.length;
  let n = grid[0].length;

  let count = 0;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      else if (grid[i][j] === 1) count++;
    }
  }

  if (count === 0) return 0;

  let time = -1;
  let positions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (queue.length) {
    time++;
    let len = queue.length;

    for (let t = 0; t < len; t++) {
      let [i, j] = queue.shift();

      for (let [y, x] of positions) {
        let di = i + y;
        let dj = j + x;

        if (di < 0 || dj < 0 || di >= m || dj >= n || grid[di][dj] !== 1) {
          continue;
        }

        count--;
        grid[di][dj] = 2;
        queue.push([di, dj]);
      }
    }
  }

  return count === 0 ? time : -1;
};
