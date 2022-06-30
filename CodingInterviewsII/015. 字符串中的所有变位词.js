/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 方法一：滑动窗口
var findAnagrams = function (s, p) {
  const sLen = s.length;
  const pLen = p.length;
  if (sLen < pLen) return [];

  const ans = [];
  const sCnt = new Array(26).fill(0);
  const pCnt = new Array(26).fill(0);
  // 在 s 中构造一个长度为与 p 的长度相同的滑动窗口
  for (let i = 0; i < pLen; i++) {
    ++sCnt[s[i].charCodeAt() - 'a'.charCodeAt()];
    ++pCnt[p[i].charCodeAt() - 'a'.charCodeAt()];
  }
  if (sCnt.toString() === pCnt.toString()) ans.push(0);

  for (let i = 0; i < sLen - pLen; i++) {
    --sCnt[s[i].charCodeAt() - 'a'.charCodeAt()];
    ++sCnt[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

    // 当窗口中每种字母的数量与字符串 p 中每种字母的数量相同时
    // 说明当前窗口为字符串 p 的变位词
    if (sCnt.toString() === pCnt.toString()) {
      ans.push(i + 1);
    }
  }

  return ans;
};
// 时间复杂度：O(m + (n − m) × Σ)
// 空间复杂度：O(Σ)
s = 'cbaebabacd';
p = 'abc';
console.log(findAnagrams(s, p));
