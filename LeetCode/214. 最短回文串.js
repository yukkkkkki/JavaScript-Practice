// 给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。

// 示例 1:
// 输入: "aacecaaa"
// 输出: "aaacecaaa"

// 示例 2:
// 输入: "abcd"
// 输出: "dcbabcd"

// 方法一：暴力法
var shortestPalindrome = function (s) {
  const n = s.length;
  const rev_s = s.split('').reverse().join('');
  for (let i = n; i >= 0; i--) {
    if (s.substring(0, i) == rev_s.substring(n - i)) {
      return rev_s.substring(0, n - i) + s;
    }
  }
};
