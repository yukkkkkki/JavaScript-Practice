/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
//  方法一：两次遍历
var shortestToChar = function (s, c) {
  const n = s.length;
  const res = new Array(n).fill(0);

  for (let i = 0, idx = -n; i < n; i++) {
    if (s[i] === c) {
      idx = i;
    }
    res[i] = i - idx;
  }

  for (let i = n - 1, idx = 2 * n; i >= 0; i--) {
    if (s[i] === c) {
      idx = i;
    }
    res[i] = Math.min(res[i], idx - i);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
