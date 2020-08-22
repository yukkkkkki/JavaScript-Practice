// 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
// 请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

// 示例：
// matrix = [
//    [ 1,  5,  9],
//    [10, 11, 13],
//    [12, 13, 15]
// ],
// k = 8,
// 返回 13。

// 二分查找
// 思路：
// 把整个矩阵 “展平” 成一个有序的一维数组看待
// 二分查找：算出中间数值（不是中间索引），并算出矩阵里，小于等于这个中间值的有几个，count 个
// 将 count 和 k 比较，如果比 k 小，说明我们选的中间值小了，目标值在右边，调整左边界，
// 否则，说明中间值大了，目标值在左边，调整右边界
const countInMatrix = (matrix, midVal) => {
  const n = matrix.length;
  let count = 0;
  let row = 0;
  let col = n - 1;
  while (row < n && col >= 0) {
    if (midVal >= matrix[row][col]) {
      count += col + 1;
      row++;
    } else {
      col--;
    }
  }
  return count;
};
var kthSmallest = function (matrix, k) {
  const n = matrix.length;
  let low = matrix[0][0];
  let high = matrix[n - 1][n - 1];
  while (low <= high) {
    let midVal = low + ((high - low) >>> 1);
    let count = countInMatrix(matrix, midVal);
    if (count < k) {
      low = midVal + 1;
    } else {
      high = midVal - 1;
    }
  }
  return low;
};

// 方法二 归并排序
var kthSmallest = function (matrix, k) {
  if (matrix.length < 1) return 0;
  let arr = matrix.reduce((a, b) => merge(a, b));
  return arr[k - 1];
};

function merge(left, right) {
  let llen = left.length;
  let rlen = right.length;
  let i = 0;
  let j = 0;
  let res = [];
  while (i < llen && j < rlen) {
    if (left[i] < right[j]) {
      res.push(left[i++]);
    } else {
      res.push(right[j++]);
    }
  }
  while (i < llen) res.push(left[i++]);
  while (j < rlen) res.push(right[j++]);
  return res;
}
