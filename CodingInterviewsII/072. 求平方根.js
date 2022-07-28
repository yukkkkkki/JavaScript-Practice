/**
 * @param {number} x
 * @return {number}
 */
// 方法一：二分查找
var mySqrt = function (x) {
  if (x === 0) return 0;

  let l = 0;
  let r = x;

  while (l <= r) {
    let mid = Math.floor((r - l) / 2) + l;

    if (mid * mid === x) {
      return mid;
    } else if (mid * mid < x) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return r;
};
// 时间复杂度：O(logx)
// 空间复杂度：O(n)
