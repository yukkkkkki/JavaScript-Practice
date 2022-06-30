/**
 * @param {number[][]} matrix
 */
// 方法一：一维前缀和
var NumMatrix = function (matrix) {
  const m = matrix.length;
  if (m > 0) {
    const n = matrix[0].length;
    this.sums = new Array(m).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        this.sums[i][j + 1] = this.sums[i][j] + matrix[i][j];
      }
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  let sum = 0;
  for (let i = row1; i <= row2; i++) {
    sum += this.sums[i][col2 + 1] - this.sums[i][col1];
  }
  return sum;
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
