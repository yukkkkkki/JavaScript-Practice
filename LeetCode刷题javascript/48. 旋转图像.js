// 定一个 n × n 的二维矩阵表示一个图像。

// 将图像顺时针旋转 90 度。

// 说明：
// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

// 示例 1:
// 给定 matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]

// 示例 2:
// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ],
// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]

// 方法一
// 先将矩阵沿左上角到右下角的对角线进行对称，然后将矩阵沿垂直中线对称即可
// 即先交换matrix[i][j], matrix[j][i]，再每行数组reverse
var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  return matrix.map((item) => item.reverse());
};

// 方法二
// 先将矩阵沿右上角到左下角的对角线进行对称，然后将矩阵沿水平中线对称
var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][n - 1 - i];
      matrix[n - 1 - j][n - 1 - i] = temp;
    }
  }
  // 从头到尾交换每一行
  for (let k = 0; k < Math.floor(n / 2); k++) {
    let temp = matrix[k];
    matrix[k] = matrix[n - 1 - k];
    matrix[n - 1 - k] = temp;
  }
  return matrix;
};
