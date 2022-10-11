/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 方法一：计数统计
var areAlmostEqual = function (s1, s2) {
  const n = s1.length;
  const diff = [];
  for (let i = 0; i < n; i++) {
    if (s1[i] !== s2[i]) {
      if (diff.length >= 2) return false;
      diff.push(i);
    }
  }

  if (diff.length === 0) return true;
  if (diff.length !== 2) return false;
  return s1[diff[0]] === s2[diff[1]] && s1[diff[1]] === s2[diff[0]];
};
// 时间复杂度：O(n)
// 空间复杂度：O(C)
