// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 示例 1:
// s = "abc", t = "ahbgdc"
// 返回 true.

// 示例 2:
// s = "axc", t = "ahbgdc"
// 返回 false.

// 后续挑战 :
// 如果有大量输入的 S，称作S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

// 方法一：双指针
// 两个指针扫长串和短串，如果指向的字符相同，两个指针都移动，如果不相同，短串的指针不动，长串的指针移动，继续考察
// 如果短串走完了，说明短串中的字符在长串中都有匹配
// 否则，短串没有走完，长串走完了，说明长串考察完了也没能找齐短串的所有字符
var isSubsequence = function (s, t) {
  if (s.length == 0) return true;
  let index = 0,
    subIndex = 0;
  while (index < t.length) {
    if (s[subIndex] == t[index]) {
      subIndex++;
      if (subIndex > s.length - 1) {
        return true;
      }
    }
    index++;
  }
  return false;
};
// 时间复杂度：O(n)

// 方法二：递归
var isSubsequence = function (s, t) {
  if (s.length == 0) return true;
  let i = 0;
  while (i < t.length) {
    if (s[0] == t[i]) {
      const rest_sub = s.substring(1);
      const rest_str = t.substring(i + 1);
      return isSubsequence(rest_sub, rest_str);
    }
    i++;
  }
  return false;
};

// 方法三：利用栈
var isSubsequence = function (s, t) {
  const sStack = s.split("");
  const tArray = t.split("");
  for (let i = 0; i < tArray.length; i++) {
    if (tArray[i] === sStack[0]) {
      sStack.shift();
    }

    if (sStack.length === 0) {
      return true;
    }
  }
  if (sStack.length === 0) {
    return true;
  }
  return false;
};
