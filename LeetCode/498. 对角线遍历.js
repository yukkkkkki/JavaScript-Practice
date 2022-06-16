/**
 * @param {number[][]} mat
 * @return {number[]}
 */
// 方法一：直接模拟
// 一共有 m + n - 1 条对角线，相邻的对角线的遍历方向不同，当前遍历方向为从左下到右上，则紧挨着的下一条对角线遍历方向为从右上到左下；
var findDiagonalOrder = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const res = new Array(m * n).fill(0);

  let pos = 0;
  for (let i = 0; i < m + n - 1; i++) {
    if (i % 2 === 1) {
      // 当 i 为奇数时，第 i 条对角线从上往下遍历
      // 每次行索引加 1，列索引减 1，直到矩阵的边缘为止：
      //   当 i < n 时，则此时对角线遍历的起点位置为 (0, i)
      //   当 i ≥ n 时，则此时对角线遍历的起点位置为 (i - n + 1, n - 1)
      let x = i < n ? 0 : i - n + 1;
      let y = i < n ? i : n - 1;
      while (x < m && y >= 0) {
        res[pos] = mat[x][y];
        pos++;
        x++;
        y--;
      }
    } else {
      // 当 i 为偶数时，第 i 条对角线从下往上遍历
      // 每次行索引减 1，列索引加 1，直到矩阵的边缘为止：
      //   当 i < m 时，则此时对角线遍历的起点位置为 (i, 0)
      //   当 i ≥ m 时，则此时对角线遍历的起点位置为 (m - 1, i - m + 1)
      let x = i < m ? i : m - 1;
      let y = i < m ? 0 : i - m + 1;
      while (x >= 0 && y < n) {
        res[pos] = mat[x][y];
        pos++;
        x--;
        y++;
      }
    }
  }
  return res;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
