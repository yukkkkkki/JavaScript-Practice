/**
 * @param {number} n
 * @return {string}
 */
// 方法一：分类讨论
// 当 n 为奇数时，我们返回 n 个 ‘a’ 组成的字符串。
// 当 n 为偶数时，我们返回 n−1 个 ‘a’ 和一个 ‘b’ 组成的字符串
var generateTheString = function (n) {
  const sb = '';
  if (n % 2 == 1) {
    return sb + 'a'.repeat(n);
  }

  return sb + 'a'.repeat(n - 1) + 'b';
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
