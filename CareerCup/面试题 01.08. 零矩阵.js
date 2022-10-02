/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 方法一：使用标记数组
// 用两个标记数组分别记录每一行和每一列是否有零出现
var setZeroes = function (matrix) {
  let rows = new Set();
  let cols = new Set();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] == 0) {
        rows.add(row);
        cols.add(col);
      }
    }
  }
  // 行清零
  for (let row of rows) {
    for (let col = 0; col < matrix[row].length; col++) {
      matrix[row][col] = 0;
    }
  }
  // 列清零
  for (let col of cols) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][col] = 0;
    }
  }
  return matrix;
};

console.log(
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5]
  ])
);
