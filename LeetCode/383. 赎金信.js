/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// 方法一：字符统计
var canConstruct = function (ransomNote, magazine) {
  if (ransomNote.length > magazine.length) return false;

  const cnt = new Array(26).fill(0);
  for (const c of magazine) {
    cnt[c.charCodeAt() - 'a'.charCodeAt()]++;
  }

  for (const c of ransomNote) {
    cnt[c.charCodeAt() - 'a'.charCodeAt()]--;
    if (cnt[c.charCodeAt() - 'a'.charCodeAt()] < 0) {
      return false;
    }
  }

  return true;
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(|S|)
