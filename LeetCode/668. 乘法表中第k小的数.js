/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 方法一：二分查找
// 求第几小等价于求有多少数字不超过 x
var findKthNumber = function (m, n, k) {
  let left = 1;
  let right = m * n;

  while (left < right) {
    const x = left + Math.floor((right - left) / 2);

    let count = Math.floor(x / n) * n;
    // 遍历乘法表的每一行，对于乘法表的第 i 行，其数字均为 i 的倍数
    // 因此不超过 x 的数字有 min(⌊ x / i ⌋,n) 个
    // 所以整个乘法表不超过 x 的数字个数为 ∑_{i = 1 to m} min(⌊ x / i ⌋,n)
    for (let i = Math.floor(x / n) + 1; i <= m; i++) {
      count += Math.floor(x / i);
    }

    if (count >= k) {
      right = x;
    } else {
      left = x + 1;
    }
  }

  return left;
};
// 时间复杂度：O(mlogmn)
// 空间复杂度：O(1)

