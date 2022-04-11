/**
 * @param {number} c
 * @return {boolean}
 */
// 方法一：双指针
var judgeSquareSum = function (c) {
  let l = 0;
  let r = Math.floor(Math.sqrt(c));

  while (l <= r) {
    const sum = l * l + r * r;
    if (sum === c) {
      return true;
    } else if (sum > c) {
      r--;
    } else {
      l++;
    }
  }
  return false;
};
// 时间复杂度：O(\sqrt{c})
// 空间复杂度：O(1)
