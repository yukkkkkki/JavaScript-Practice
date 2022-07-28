/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} indices
 * @return {number}
 */
//  方法一：直接模拟
var oddCells = function (m, n, indices) {
  let res = 0;
  const matrix = new Array(m).fill(0).map(() => new Array(n).fill(0));
  // 对于 indices 中的每一对 [ri, ci]，将矩阵第 ri 行的所有数增加 1，第 ci 列的所有数增加 1
  for (const index of indices) {
    for (let i = 0; i < n; i++) {
      matrix[index[0]][i]++;
    }
    for (let i = 0; i < m; i++) {
      matrix[i][index[1]]++;
    }
  }

  // 在所有操作模拟完毕后，我们遍历矩阵，得到奇数的数目
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if ((matrix[i][j] & 1) !== 0) {
        res++;
      }
    }
  }

  return res;
};
// 时间复杂度：O(q × (m + n) + m × n)
// 空间复杂度：O(m × n)

// 方法二：模拟空间优化
var oddCells = function (m, n, indices) {
  // 使用一个行数组 rows 和列数组 cols 分别记录每一行和每一列被增加的次数
  const rows = new Array(m).fill(0);
  const cols = new Array(n).fill(0);
  // 对于 indices 中的每一对 [ri, ci]，我们将 rows[ri] 和 cols[ci] 的值分别增加 1
  for (const index of indices) {
    rows[index[0]]++;
    cols[index[1]]++;
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (((rows[i] + cols[j]) & 1) !== 0) {
        res++;
      }
    }
  }

  return res;
};
// 时间复杂度：O(q + m × n)
// 空间复杂度：O(m × n)

// 方法三：计数优化
var oddCells = function (m, n, indices) {
  const rows = new Array(m).fill(0);
  const cols = new Array(n).fill(0);
  for (const index of indices) {
    rows[index[0]]++;
    cols[index[1]]++;
  }

  // 设 rows 有 oddx 个奇数，cols 有 oddy 个奇数
  let oddx = 0;
  let oddy = 0;
  for (let i = 0; i < m; i++) {
    if ((rows[i] & 1) !== 0) oddx++;
  }

  for (let i = 0; i < n; i++) {
    if ((cols[i] & 1) !== 0) oddy++;
  }

  return oddx * (n - oddy) + (m - oddx) * oddy;
};
// 时间复杂度：O(q + m + n)
// 空间复杂度：O(m + n)
