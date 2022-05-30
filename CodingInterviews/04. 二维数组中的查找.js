/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 方法一：暴力求解
var findNumberIn2DArray = function (matrix, target) {
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
    return false;
  }

  let rows = matrix.length;
  let cols = matrix[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == target) {
        return true;
      }
    }
  }

  return false;
};
// 时间复杂度：O(nm)
// 空间复杂度：O(1)

// 方法二：二分查找
// 从二维数组的右上角开始查找
// 如果当前元素等于目标值，则返回 true
// 如果当前元素大于目标值，则移到左边一列
// 如果当前元素小于目标值，则移到下边一行。
var findNumberIn2DArray = function (matrix, target) {
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  let row = 0;
  let col = n - 1;
  while (row < m && col >= 0) {
    var num = matrix[row][col];
    if (num == target) {
      return true;
    } else if (num > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
};
// 时间复杂度：O(n+m)
// 空间复杂度：O(1)
