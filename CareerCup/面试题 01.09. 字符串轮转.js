// 字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成（比如，waterbottle是erbottlewat旋转后的字符串）。

// 示例1:
//  输入：s1 = "waterbottle", s2 = "erbottlewat"
//  输出：True

// 示例2:
//  输入：s1 = "aa", s2 = "aba"
//  输出：False

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function (s1, s2) {
  if (s1.length !== s2.length) return false;
  return (s2 + s2).indexOf(s1) !== -1;
};
