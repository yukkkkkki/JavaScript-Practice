// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

// 示例 1:
// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:
// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 示例 3:
// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 方法一
var lengthOfLongestSubstring = function (s) {
  const len = s.length;
  let res = 0;
  let temp = "";
  for (let i = 0; i < len; i++) {
    if (temp.indexOf(s[i]) === -1) {
      temp += s[i];
      res = Math.max(res, temp.length);
    } else {
      temp = temp.slice(temp.indexOf(s[i]) + 1);
      temp += s[i];
    }
  }
  return res;
};

// 方法二：滑动窗口
var lengthOfLongestSubstring = function (s) {
  const len = s.length;
  const map = new Map();
  let i = 0,
    j = 0;

  let res = 0;
  while (i < len && j < len) {
    // 检查s[j]是否出现过，并且s[j]重复的字符是否在当前的滑动窗口中
    if (map.has(s[j]) && map.get(s[j]) >= i) {
      i = map.get(s[j]) + 1;
    }

    res = Math.max(j - i + 1, res);
    map.set(s[j], j);
    ++j;
  }
  return res;
};
