/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 方法一：滑动窗口
// 在字符串中构造一个长度与字符串p长度相同的滑动窗口，在滑动中维护窗口中每种字母的数量
// 当窗口中每种字母的数量与字符串p中每种字母数量相同时，则说明当前窗口为字符串p的异位词
var findAnagrams = function (s, p) {
  const n = s.length;
  const m = p.length;

  if (n < m) {
    return [];
  }

  const ans = [];
  const sCount = new Array(26).fill(0);
  const pCount = new Array(26).fill(0);
  for (let i = 0; i < m; ++i) {
    ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
    ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
  }

  if (sCount.toString() === pCount.toString()) {
    ans.push(0);
  }

  for (let i = 0; i < n - m; ++i) {
    --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
    ++sCount[s[i + m].charCodeAt() - 'a'.charCodeAt()];

    if (sCount.toString() === pCount.toString()) {
      ans.push(i + 1);
    }
  }

  return ans;
};

// 时间复杂度：O(m+(n−m)×Σ) 6Σ=26
// 空间复杂度：O(Σ)
