// 给你一个只包含 0 和 1 的 rows * columns 矩阵 mat ，请你返回有多少个 子矩形 的元素全部都是 1 。

// 示例 1：
// 输入：mat = [[1,0,1],
//             [1,1,0],
//             [1,1,0]]
// 输出：13
// 解释：
// 有 6 个 1x1 的矩形。
// 有 2 个 1x2 的矩形。
// 有 3 个 2x1 的矩形。
// 有 1 个 2x2 的矩形。
// 有 1 个 3x1 的矩形。
// 矩形数目总共 = 6 + 2 + 3 + 1 + 1 = 13 。

// 示例 2：
// 输入：mat = [[0,1,1,0],
//             [0,1,1,1],
//             [1,1,1,0]]
// 输出：24
// 解释：
// 有 8 个 1x1 的子矩形。
// 有 5 个 1x2 的子矩形。
// 有 2 个 1x3 的子矩形。
// 有 4 个 2x1 的子矩形。
// 有 2 个 2x2 的子矩形。
// 有 2 个 3x1 的子矩形。
// 有 1 个 3x2 的子矩形。
// 矩形数目总共 = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24 。

/**
 * @param {number[][]} mat
 * @return {number}
 */

// 方法一：枚举 + 动态规划
// 递推公式：
// row[i][j] 代表矩阵中（i,j）向左延伸连续 1 的个数
// row[i][j] = 0,                   mat[i][j] = 0
//           = row[i][j - 1] + 1,   mat[i][j] = 1
// 第 k 行满足条件的子矩形个数就是这些值的最小值，它代表了「第 k 行到第 i 行子矩形的宽的最大值」，公式化来说，即：
//   min  {row[l][j]}
// l=k...i
var numSubmat = function (mat) {
  const n = mat.length;
  const m = mat[0].length;
  const row = new Array(n);
  for (let i = 0; i < n; i++) {
    row[i] = new Array(m);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (j == 0) {
        row[i][j] = mat[i][j];
      } else if (mat[i][j] !== 0) {
        row[i][j] = row[i][j - 1] + 1;
      } else {
        row[i][j] = 0;
      }
    }
  }
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let col = row[i][j];
      for (let k = i; k >= 0 && col !== 0; k--) {
        col = Math.min(col, row[k][j]);
        res += col;
      }
    }
  }
};
