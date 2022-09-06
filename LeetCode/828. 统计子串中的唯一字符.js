/**
 * @param {string} s
 * @return {number}
 */
// 方法一：分别计算每个字符的贡献
var uniqueLetterString = function (s) {
  const index = new Map();
  // 对每个字符，计算有多少子字符串仅包含该字符一次
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!index.has(c)) {
      index.set(c, []);
      index.get(c).push(-1);
    }
    index.get(c).push(i);
  }

  let res = 0;
  for (const [_, arr] of index.entries()) {
    arr.push(s.length);
    // 对于 ci, 记同字符上一次出现的位置 cj, 下一次出现的位置为 ck
    // 该字符共有 (ci - cj) x (ck - cj) 种可能
    for (let i = 1; i < arr.length - 1; i++) {
      res += (arr[i] - arr[i - 1]) * (arr[i + 1] - arr[i]);
    }
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
