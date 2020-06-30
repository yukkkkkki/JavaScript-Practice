// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

// 示例：
// s = "leetcode"
// 返回 0

// s = "loveleetcode"
// 返回 2

// 方法一 库函数
// 1. 从头到尾遍历一遍字段串；
// 2. 判断每个位置的字符的 index() 和 lastIndexOf() 的结果是否相等；
var firstUniqChar = function (s) {
  for (let i = 0; i < s.length; i += 1) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
};

// 时间复杂度：O(n^2) 空间复杂度：O(1)

// 哈希
// 1. 第一次遍历，用一个哈希对象记录所有字符的出现次数；
// 2. 第二次遍历，找出哈希对象中只出现一次的字符的下标；
var firstUniqChar = function (s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    if (!hash[s[i]]) {
      hash[s[i]] = 1;
    } else {
      hash[s[i]] += 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]] === 1) {
      return i;
    }
  }
  return -1;
};
// 空间复杂度：O(1) 时间复杂度：O(n)
