/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：贪心
var maxIncreaseKeepingSkyline = function (grid) {
  const n = grid.length;
  // 记录矩阵 grid 的每一行的最大值
  const rowMax = new Array(n).fill(0);
  const colMax = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rowMax[i] = Math.max(rowMax[i], grid[i][j]);
      colMax[j] = Math.max(colMax[j], grid[i][j]);
    }
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 为了保持城市天际线，该建筑物增加后的高度不能超过其所在行和所在列的建筑物高度最大值
      // 所以，该建筑物高度可以增加的最大值是 min(rowMax[i], colMax[j]) − grid[i][j]。
      res += Math.min(rowMax[i], colMax[j]) - grid[i][j];
    }
  }

  return res;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
