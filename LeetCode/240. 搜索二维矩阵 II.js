// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
//     每行的元素从左到右升序排列。
//     每列的元素从上到下升序排列。

// 示例:
// 现有矩阵 matrix 如下：

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]

// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

// 方法一：暴力法
// 时间复杂度：O(n^2); 空间复杂度：O(1)
var searchMatrix = function (matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }
  return false;
};

// 方法二：相邻比较法
// 由于矩阵的行和列是排序的，从左到右递增，从上到下递增，所以对任意元素和目标值比较大小
// 时，总可以去找相对较小（往左往上）或相对较大（往右往下）的值继续比较，直到找到目标值或
// 找不到。
var searchMatrix = function (matrix, target) {
  let j = matrix.length - 1;
  let i = 0;
  while (j >= 0 && i < matrix[0].length) {
    if (matrix[j][i] > target) {
      j--;
    } else if (matrix[j][i] < target) {
      i++;
    } else {
      return true;
    }
  }
  return false;
};
// 时间复杂度：O(n + m); 空间复杂度:O(1)
