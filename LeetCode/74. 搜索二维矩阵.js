/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 方法一：暴力法
var searchMatrix = function (matrix, target) {
  if (!matrix || !matrix[0]) return false;
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == target) return true;
    }
  }
  return false;
};
// 时间复杂度 O(n^2) 空间复杂度 O(1)

// 方法二：二分查找
var searchMatrix = function (matrix, target) {
  let i = matrix.length - 1;
  let j = 0;
  while (i >= 0 && j < matrix[0].length) {
    // 取二维数组中左下角的值和目标值比较
    if (matrix[i][j] > target) {
      // 若该值比目标值大，则向上查找（第一个索引减 1）
      i--;
    } else if (matrix[i][j] < target) {
      // 若该值比目标值小，则向右查找（第二个索引加 1）
      j++;
    } else {
      // 当查询值等于目标值时则返回 true
      return true;
    }
  }
  return false;
};
// 时间复杂度 O(n + m)
// 空间复杂度 O(1)

// 方法三：降维成一维 + 二分查找
// 矩阵符合这样的条件：
// 每行中的整数从左到右按升序排列 （说明每一行都是单调递增的）
// 每行的第一个整数大于前一行的最后一个整数。（这就说明下一行的开始比上一行最大的大）
// 可以将数组拍平，这样就是形成一维的单调递增的数组，再用二分查找的模板求解
var searchMatrix = function (matrix, target) {
  matrix = matrix.flat(2);
  let start = 0,
    end = matrix.length - 1;
  while (start <= end) {
    // (end - start) >> 1相当于(end - start) / 2
    const mid = (start + (end - start)) >> 1;
    if (matrix[mid] == target) {
      return true;
    } else if (matrix[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return false;
};
