/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 方法一：广度优先搜素
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  let n = mat.length;
  let m = mat[0].length;
  let res = new Array(n)
    .fill(0)
    .map(() => new Array(m).fill(Number.MAX_SAFE_INTEGER));
  let queue = new Array();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (mat[i][j] == 0) {
        // 值为 0 的节点入队列
        queue.push([i, j]);
        // 距离设为 0
        res[i][j] = 0;
      }
    }
  }

  let dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ];
  // 广度优先搜索
  while (queue.length) {
    let cur = queue.shift();
    let dist = res[cur[0]][cur[1]];

    for (let dir of dirs) {
      let r = cur[0] + dir[0];
      let c = cur[1] + dir[1];

      if (r >= 0 && r < n && c >= 0 && c < m) {
        if (res[r][c] > dist + 1) {
          // 因为是广度优先 所以如果之前遍历过 那么一定不会大于 没有遍历过则为max
          res[r][c] = dist + 1;
          queue.push([r, c]);
        }
      }
    }
  }

  return res;
};
// 时间复杂度：O(nm)
// 空间复杂度：O(nm)
