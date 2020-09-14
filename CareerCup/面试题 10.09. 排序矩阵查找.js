// 给定M×N矩阵，每一行、每一列都按升序排列，请编写代码找出某元素。

// 示例:
// 现有矩阵 matrix 如下：
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 方法一：二分法
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  if (!m) return false;
  const n = matrix[0].length;
  let i = m - 1,
    j = 0;
  while (i >= 0 && j < n) {
    if (matrix[i][j] > target) {
      i--;
    } else if (matrix[i][j] < target) {
      j++;
    } else {
      return true;
    }
  }
  return false;
};
console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20
  )
);
