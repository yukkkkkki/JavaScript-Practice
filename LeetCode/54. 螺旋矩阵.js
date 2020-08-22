// 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

// 示例 1:
// 输入:
// [
//  [ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 8, 9 ]
// ]
// 输出: [1,2,3,6,9,8,7,4,5]

// 示例 2:
// 输入:
// [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9,10,11,12]
// ]
// 输出: [1,2,3,4,8,12,11,10,9,5,6,7]

// 方法一 ：转圈循环，遍历到底
// 让循环继续的条件是cols > startX * 2 且 rows > startY * 2
var spiralOrder = function (matrix) {
  if (matrix === null || matrix.length <= 0 || matrix[0].length <= 0) {
    return [];
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  let res = [];

  let start = 0;
  while (cols > start * 2 && rows > start * 2) {
    res = help(matrix, cols, rows, start, res);
    ++start;
  }

  return res;
};

function help(matrix, cols, rows, start, res) {
  let endX = cols - 1 - start;
  let endY = rows - 1 - start;

  // 从左到右打印一行
  for (let i = start; i <= endX; ++i) {
    res.push(matrix[start][i]);
  }

  // 从上到下打印一列
  if (start < endY) {
    for (let i = start + 1; i <= endY; ++i) {
      res.push(matrix[i][endX]);
    }
  }

  // 从右到左打印一行
  if (start < endX && start < endY) {
    for (let i = endX - 1; i >= start; --i) {
      res.push(matrix[endY][i]);
    }
  }

  // 从下到上打印一行
  if (start < endX && start < endY - 1) {
    for (let i = endY - 1; i >= start + 1; --i) {
      res.push(matrix[i][start]);
    }
  }

  return res;
}

// 方法二
var spiralOrder = function (matrix) {
  if (matrix.length == 0) return [];
  const res = [];

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;

    if (top > bottom || left > right) break;
    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
};

// 方法三
var spiralOrder = function (matrix) {
  if (matrix.length == 0) return [];
  const res = [];
  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;
  const size = matrix.length * matrix[0].length;
  while (res.length !== size) {
    for (let i = left; i <= right; i++) res.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
    right--;
    if (res.length === size) break; // 遍历结束
    for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
    bottom--;
    for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
    left++;
  }
  return res;
};
