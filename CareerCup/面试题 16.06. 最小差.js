// 给定两个整数数组a和b，计算具有最小差绝对值的一对数值（每个数组中取一个值），并返回该对数值的差

// 示例：
// 输入：{1, 3, 15, 11, 2}, {23, 127, 235, 19, 8}
// 输出： 3，即数值对(11, 8)

/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
// 方法一：排序 + 双指针
var smallestDifference = function (a, b) {
  a.sort((i, j) => i - j);
  b.sort((i, j) => i - j);
  let left = 0,
    Right = 0,
    res = Infinity;
  while (left < a.length && Right < b.length) {
    res = Math.min(res, Math.abs(a[left] - b[Right]));
    if (a[left] > b[Right]) Right++;
    else left++;
  }
  return res;
};
