// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

// 示例 1:
// 输入: "abab"
// 输出: True
// 解释: 可由子字符串 "ab" 重复两次构成。

// 示例 2:
// 输入: "aba"
// 输出: False

// 示例 3:
// 输入: "abcabcabcabc"
// 输出: True
// 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)

// 方法一：正则匹配
var repeatedSubstringPattern = function (s) {
  let reg = /^(\w+)\1+$/;
  return reg.test(s);
};

// 方法二：将原字符串拷贝一份，并首尾相连，将得到的字符串收尾各去掉一个字符，判断是否可以包含原串
var repeatedSubstringPattern = function (s) {
  return (s + s).substring(1, s.length * 2 - 1).indexOf(s) !== -1;
};