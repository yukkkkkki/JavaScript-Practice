/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
// 方法一：广度优先搜索 BFS
var nearestExit = function (maze, entrance) {
  const m = maze.length;
  const n = maze[0].length;
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  let queue = [[entrance[0], entrance[1], 0]];
  maze[entrance[0]][entrance[1]] = "+";
  while (queue.length) {
    const [x, y, d] = queue.shift();

    for (let dir of dirs) {
      let dx = x + dir[0];
      let dy = y + dir[1];

      // 新坐标合法且不为墙
      if (dx >= 0 && dx < m && dy >= 0 && dy < n && maze[dx][dy] === ".") {
        if (dx === 0 || dx === m - 1 || dy === 0 || dy === n - 1) {
          // 新坐标为出口，返回距离作为答案
          return d + 1;
        }

        maze[dx][dy] = "+";
        queue.push([dx, dy, d + 1]);
      }
    }
  }
  return -1;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
