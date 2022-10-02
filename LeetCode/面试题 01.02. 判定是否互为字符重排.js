/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 方法一：哈希表
var CheckPermutation = function (s1, s2) {
  if (s1.length !== s2.length) return false;

  const table = new Array(128).fill(0);
  for (let i = 0; i < s1.length; i++) {
    table[s1.codePointAt(i)]++;
  }

  for (let i = 0; i < s2.length; i++) {
    table[s2.codePointAt(i)]--;
    if (table[s2.codePointAt(i)] < 0) {
      return false;
    }
  }

  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(S)
