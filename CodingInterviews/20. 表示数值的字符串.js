/**
 * @param {string} s
 * @return {boolean}
 */
// 方法一：isNaN
var isNumber = function (s) {
  s = s.trim();
  if (!s) return false;
  return !isNaN(s);
};
