// 给你一个正方形矩阵 mat，请你返回矩阵对角线元素的和。

// 请你返回在矩阵主对角线上的元素和副对角线上且不在主对角线上元素的和。

// 示例  1：
// 输入：mat = [[1,2,3],
//             [4,5,6],
//             [7,8,9]]
// 输出：25
// 解释：对角线的和为：1 + 5 + 9 + 3 + 7 = 25
// 请注意，元素 mat[1][1] = 5 只会被计算一次。

// 示例  2：
// 输入：mat = [[1,1,1,1],
//             [1,1,1,1],
//             [1,1,1,1],
//             [1,1,1,1]]
// 输出：8

// 示例 3：
// 输入：mat = [[5]]
// 输出：5

/**
 * @param {number[][]} mat
 * @return {number}
 */
// 方法一：遍历矩阵
// 当前坐标(i, j)满足 i == j 或者 i + j == n - 1
var diagonalSum = function (mat) {
  const n = mat.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i == j || i + j == n - 1) {
        sum += mat[i][j];
      }
    }
  }
  return sum;
};
// 时间复杂度：O(n^2)；空间复杂度：O(1)

// 方法二：逐行取数
var diagonalSum = function (mat) {
  const n = mat.length,
    mid = Math.floor(n / 2);
  let sum = 0;
  for (let i = 0; i < n; ++i) {
    sum += mat[i][i] + mat[i][n - 1 - i];
  }
  return sum - mat[mid][mid] * (n & 1);
};
console.log(
  diagonalSum([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ])
);
