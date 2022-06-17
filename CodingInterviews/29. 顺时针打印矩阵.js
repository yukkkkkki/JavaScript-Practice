/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 方法一：按层模拟
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const m = matrix.length;
  const n = matrix[0].length;
  const order = [];

  let left = 0;
  let right = n - 1;
  let top = 0;
  let bottom = m - 1;
  while (left <= right && top <= right) {
    // 从左到右遍历上侧元素：(top, left) 到 (top, right)
    for (let col = left; col <= right; col++) {
      order.push(matrix[top][col]);
    }

    // 从上到下遍历右侧元素：(top + 1,  right) 到 (bottom, right)
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }

    if (left < right && top < bottom) {
      // 从右到左遍历下侧元素：(bottom, right - 1) 到 (bottom, left + 1)
      for (let col = right - 1; col > left; col--) {
        order.push(matrix[bottom][col]);
      }

      // 从下到上遍历左侧元素：(bottom, left) 到 (top + 1,left)
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }

    // 遍历完当前层的元素：将 left 和 top 分别加 1，right 和 bottom 分别减 1，进入下一层继续遍历，
    left++;
    right--;
    bottom--;
    top++;
  }

  return order;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
