/**
 * @param {string} s
 * @return {number}
 */
// 方法一：直接遍历
var maxLengthBetweenEqualCharacters = function (s) {
  const firstIndex = new Array(26).fill(-1);
  let maxLength = -1;

  for (let i = 0; i < s.length; i++) {
    if (firstIndex[s[i].charCodeAt() - "a".charCodeAt()] < 0) {
      firstIndex[s[i].charCodeAt() - "a".charCodeAt()] = i;
    } else {
      maxLength = Math.max(
        maxLength,
        i - firstIndex[s[i].charCodeAt() - "a".charCodeAt()] - 1
      );
    }
  }

  return maxLength;
};
// 间复杂度：O(n)
// 空间复杂度：O(|Σ|)
