// 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。

// 示例 1：
// 输入: s = "leetcode"
// 输出: false

// 示例 2：
// 输入: s = "abc"
// 输出: true

var isUnique = function (astr) {
  let map = new Map();
  const n = astr.length;
  for (let i = 0; i < n; i++) {
    if (map.has(astr[i])) {
      return false;
    } else {
      map.set(astr[i]);
    }
  }
  return true;
};
