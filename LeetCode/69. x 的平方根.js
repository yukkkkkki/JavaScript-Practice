/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let l = 0;
  let r = x;

  while (l <= r) {
    let mid = l + ((r - l) >> 1);
    if (mid * mid <= x) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return r;
};
// 时间复杂度：O(logx)
// 空间复杂度：O(1)
