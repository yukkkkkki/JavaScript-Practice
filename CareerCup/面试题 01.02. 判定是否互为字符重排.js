// 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

// 示例 1：
// 输入: s1 = "abc", s2 = "bca"
// 输出: true

// 示例 2：
// 输入: s1 = "abc", s2 = "bad"
// 输出: false

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 方法一：Map存值比较
var CheckPermutation = function (s1, s2) {
  const m = s1.length;
  const n = s2.length;
  if (m !== n) return false;
  let map1 = new Map();
  let map2 = new Map();
  let flag = true;
  for (let i = 0; i < m; i++) {
    if (map1.has(s1[i])) {
      map1.set(s1[i], map1.get(s1[i]) + 1);
    } else {
      map1.set(s1[i], 1);
    }
  }

  for (let j = 0; j < n; j++) {
    if (map2.has(s2[j])) {
      map2.set(s2[j], map2.get(s2[j]) + 1);
    } else {
      map2.set(s2[j], 1);
    }
  }

  map1.forEach((value, key) => {
    if (!map2.has(key)) {
      flag = false;
    }
    if (map2.get(key) !== value) {
      flag = false;
    }
  });
  return flag;
};

// 方法二
var CheckPermutation = function (s1, s2) {
  return s1.split('').sort().toString() === s2.split('').sort().toString();
};
