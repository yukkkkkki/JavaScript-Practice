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
    [1, 0],
  ];

  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        queue.push([i, j]);
        // 置为 true 就不会存在 0 到 0 扩散的路径了
        vis[i][j] = true;
      }
    }
  }

  while (queue.length) {
    // 队首出元素，从当前节点扩散，扩散的条件是在矩阵范围内且并未被访问过
    let [curI, curJ] = queue.shift();

    for (let dir of dirs) {
      let newI = curI + dir[0];
      let newJ = curJ + dir[1];

      // 超出边界 或者已经访问过了
      if (newI < 0 || newI >= m || newJ < 0 || newJ >= n || vis[newI][newJ]) {
        continue;
      }

      // 从上一个点扩散到当前点  路径长度加 1
      dist[newI][newJ] = dist[curI][curJ] + 1;
      vis[newI][newJ] = true;
      queue.push([newI, newJ]);
    }
  }
  return dist;
};
