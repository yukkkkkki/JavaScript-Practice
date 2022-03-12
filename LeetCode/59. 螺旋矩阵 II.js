/**
 * @param {number} n
 * @return {number[][]}
 */
// 方法一：按层模拟
var generateMatrix = function (n) {
  let num = 1;
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

  let left = 0;
  let right = n - 1;
  let top = 0;
  let bottom = n - 1;
  while (left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      matrix[top][column] = num;
      num++;
    }

    for (let row = top + 1; row <= bottom; row++) {
      matrix[row][right] = num;
      num++;
    }

    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        matrix[bottom][column] = num;
        num++;
      }
      for (let row = bottom; row > top; row--) {
        matrix[row][left] = num;
        num++;
      }
    }

    left++;
    right--;
    top++;
    bottom--;
  }
  return matrix;
};
