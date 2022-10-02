/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 方法一
// 先将矩阵沿左上角到右下角的对角线进行对称，然后将矩阵沿垂直中线对称即可
// 即先交换matrix[i][j], matrix[j][i]，再每行数组reverse
var rotate = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = i; j < n; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
    matrix[i].reverse();
  }
  return matrix;
};

// console.log(
//   rotate([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );
