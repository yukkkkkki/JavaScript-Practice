/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  if (s === null) return null;
  return s
    .trim()
    .split(' ')
    .filter((value) => value !== '')
    .reverse()
    .join(' ');
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
