/**
 * @param {number[][]} mat
 * @return {number}
 */
// 方法一：列的标记值
var numSpecial = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  // 预处理行和列
  const rowsSum = new Array(m).fill(0);
  const colsSum = new Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowsSum[i] += mat[i][j];
      colsSum[j] += mat[i][j];
    }
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1 && rowsSum[i] === 1 && colsSum[j] === 1) {
        res++;
      }
    }
  }

  return res;
};
// 时间复杂度：O(m x n)
// 空间复杂度：O(m + n)

// 方法二：列的标记值
// var numSpecial = function (mat) {};
// 时间复杂度：O(m x n)
// 空间复杂度：O(1)

let mat = [
  [1, 1, 0],
  [1, 1, 1],
  [1, 0, 0]
];
console.log(numSpecial(mat));
