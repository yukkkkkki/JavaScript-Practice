/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 方法一 ：模拟
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(false));
  const total = rows * cols;
  const order = new Array(total).fill(0);

  let dirIndex = 0;
  let row = 0;
  let col = 0;
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  for (let i = 0; i < total; i++) {
    order[i] = matrix[row][col];
    visited[row][col] = true;

    const nextRow = row + dirs[dirIndex][0];
    const nextCol = col + dirs[dirIndex][1];
    if (
      !(
        0 <= nextRow &&
        nextRow < rows &&
        0 <= nextCol &&
        nextCol < cols &&
        !visited[nextRow][nextCol]
      )
    ) {
      dirIndex = (dirIndex + 1) % 4;
    }
    row += dirs[dirIndex][0];
    col += dirs[dirIndex][1];
  }

  return order;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)

// 方法二：按层模拟
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const order = [];

  let left = 0;
  let right = cols - 1;
  let top = 0;
  let bottom = rows - 1;

  while (left <= right && top <= bottom) {
    // 从左到右遍历上侧元素
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    // 从上到下遍历右侧元素
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }

    if (left < right && top < bottom) {
      // 从右到左遍历下侧元素
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      // 从下到上遍历左侧元素
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }

    // 遍历完当前层的元素之后
    // left 和 top 分别增加 1，right 和 bottom 分别减少 1
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }

  return order;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
