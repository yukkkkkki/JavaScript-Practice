/**
 * @param {number[][]} matrix
 * @return {number}
 */
// 方法一：记忆化递归
// 思路
// 遍历矩阵中的每个元素，计算以当前元素为起点的满足要求的最长路径长度
// 因为遍历每个元素，并且dfs的方向是上下左右，有些元素会被重复地访问，我们可以用一个 memo 数组去记录当前元素的dfs计算结果，
// 下次再次访问该元素时就直接返回 memo 中的值，就不用重复地递归调用了
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0]; // 0和1、1和0、0和-1、-1和0，四个方向
var longestIncreasingPath = function (matrix) {
  if (matrix.length == 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const memo = new Array(m);
  for (let i = 0; i < m; i++) memo[i] = new Array(n);
  let res = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 对坐标(i,j)进行dfs
      res = Math.max(res, dfs(matrix, i, j, m, n, memo));
    }
  }
  return res;
};

const dfs = (matrix, i, j, m, n, memo) => {
  if (memo[i][j]) return memo[i][j];
  let max = 1; // 以(i,j)为起点的路径，长度保底是1
  for (let k = 0; k < 4; k++) {
    const x = i + dx[k];
    const y = j + dy[k];
    if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
      max = Math.max(max, 1 + dfs(matrix, x, y, m, n, memo));
    }
  }
  return (memo[i][j] = max);
};

// 时间复杂度O(m*n)
// 空间复杂度O(m*n)
