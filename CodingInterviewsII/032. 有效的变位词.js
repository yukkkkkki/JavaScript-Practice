/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 方法一：排序
var isAnagram = function (s, t) {
  return (
    s.length === t.length &&
    s !== t &&
    [...s].sort().join('') === [...t].sort().join('')
  );
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)

// 方法二：哈希表
var isAnagram = function (s, t) {
  if (s.length !== t.length || s == t) return false;

  const table = new Array(26).fill(0);
  for (let i = 0; i < s.length; ++i) {
    table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
  }

  for (let i = 0; i < t.length; ++i) {
    table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
    if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
      return false;
    }
  }

  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(S)

console.log(isAnagram('a', 'a'));
