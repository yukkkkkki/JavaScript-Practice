/**
 * @param {string} s
 * @return {string[]}
 */
// 方法一：哈希表
// 用一个哈希表统计 s 所有长度为 10 的子串的出现次数，返回所有出现次数超过 10 的子串
var findRepeatedDnaSequences = function (s) {
  const L = 10;
  const res = [];
  const cnt = new Map();
  const n = s.length;

  for (let i = 0; i <= n - L; ++i) {
    const sub = s.slice(i, i + L);
    cnt.set(sub, (cnt.get(sub) || 0) + 1);
    if (cnt.get(sub) === 2) {
      res.push(sub);
    }
  }
  return res;
};
// 时间复杂度：O(NL)
// 空间复杂度：O(NL)
