/**
 * @param {string[]} strs
 * @return {number}
 */
// 方法一：枚举每个字符串
var findLUSlength = function (strs) {
  const n = strs.length;
  let ans = -1;
  for (let i = 0; i < n; ++i) {
    let check = true;
    for (let j = 0; j < n; ++j) {
      if (i !== j && isSubseq(strs[i], strs[j])) {
        check = false;
        break;
      }
    }
    if (check) {
      ans = Math.max(ans, strs[i].length);
    }
  }
  return ans;
};

const isSubseq = (s, t) => {
  let ptS = 0,
    ptT = 0;
  while (ptS < s.length && ptT < t.length) {
    if (s[ptS] === t[ptT]) {
      ++ptS;
    }
    ++ptT;
  }
  return ptS === s.length;
};
// 时间复杂度：O(n^2⋅l)
// 空间复杂度：O(1)
