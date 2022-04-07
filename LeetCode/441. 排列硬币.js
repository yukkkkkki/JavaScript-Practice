/**
 * @param {number} n
 * @return {number}
 */
// 方法一：二分查找
var arrangeCoins = function (n) {
  let left = 1;
  let right = n;

  while (left < right) {
    // const mid = Math.floor((right - left + 1) / 2) + left;
    const mid = Math.floor(left + (right - left) / 2);
    if (mid * (mid + 1) <= 2 * n) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)

// 方法二：数学
var arrangeCoins = function (n) {
  return Math.floor((Math.sqrt(8 * n + 1) - 1) / 2);
};
