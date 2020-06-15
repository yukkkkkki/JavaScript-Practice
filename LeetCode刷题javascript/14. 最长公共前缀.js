// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1:

// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 示例 2:

// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。

// 方法一
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return '';
  let res = ''; // 共同的前缀字符串
  let index = 0; // 指针
  for (let c of strs[0]) { // 遍历第一个字符串的每个字符
    for (let i = 1; i < strs.length; i++) {
      if (index >= strs[i].length || strs[i][index] !== c) {
        return res;
      }
    }
    res += c;
    index++;
  }
  return res;
};

// 方法二
var longestCommonPrefix = function (strs) {
  if (strs.length == 0) return "";
  let ans = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < ans.length && j < strs[i].length; j++) {
      if (ans[j] != strs[i][j]) break; // 遇到前缀不相同时，拿到不相同的这个j
    }
    ans = ans.substr(0, j);
    if (ans === "") return ans;
  }
  return ans;
};