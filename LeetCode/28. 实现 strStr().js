/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 方法一：KMP算法
var strStr = function (haystack, needle) {
  const n = haystack.length;
  const m = needle.length;
  if (m === 0) return 0;

  const pi = new Array(m).fill(0);
  // 求 needle 部分的前缀函数
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      j = pi[j - 1];
    }
    if (needle[i] === needle[j]) {
      j++;
    }
    pi[i] = j;
  }

  // 求 haystack 部分的前缀函数
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = pi[j - 1];
    }

    if (haystack[i] == needle[j]) j++;

    if (j === m) return i - m + 1;
  }
  return -1;
};
// 时间复杂度：O(n+m)
// 空间复杂度：O(m)
