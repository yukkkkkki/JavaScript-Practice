/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 方法一：广度优先搜索 BFS
var updateMatrix = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let dist = new Array(m).fill(0).map(() => new Array(n).fill(0));
  let vis = new Array(m).fill(false).map(() => new Array(n).fill(false));
  // 方向数组
  let dirs = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];

  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 从 0 的位置开始进行 广度优先搜索
      if (mat[i][j] == 0) {
        queue.push([i, j]);
        vis[i][j] = true; // 置为 true 就不会存在 0 到 0 扩散的路径了
      }
    }
  }

  while (queue.length) {
    // 队首出元素，从当前节点扩散，扩散的条件是在矩阵范围内且并未被访问过
    let [x, y] = queue.shift();

    for (let dir of dirs) {
      let dx = x + dir[0];
      let dy = y + dir[1];

      // 超出边界 或者已经访问过了
      if (dx < 0 || dx >= m || dy < 0 || dy >= n || vis[dx][dy]) {
        continue;
      }

      // 从上一个点扩散到当前点 路径长度加 1
      dist[dx][dy] = dist[x][y] + 1;
      vis[dx][dy] = true;
      queue.push([dx, dy]);
    }
  }

  return dist;
};
