// 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

// 注意：该题与 1081 https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters 相同

// 示例 1：
// 输入：s = "bcabc"
// 输出："abc"

// 示例 2：
// 输入：s = "cbacdcbc"
// 输出："acdb"

/**
 * @param {string} s
 * @return {string}
 */
// 方法一：贪心 + 栈
// 思路：使用栈存放当前遍历过的元素
// 从头开始对s字符串进行遍历
// 1. 若是栈中已经有的元素出现，则直接查看下一个字符
// 2. 若是栈中没出现过的元素,先跟栈顶元素进行字典序对比:
//    若s[i]比栈顶元素字典序大，则直接压栈
//    若比栈顶元素小，则查看i下表后的字符串中是否再次出现了栈顶元素：若出现过则栈顶弹出，若未出现过则s[i]正常压栈
//    当上一步出现栈顶元素出栈，若栈中仍有元素，还需要继续进行s[i]与栈顶元素的字典序对比，继续第2步直到s[i]得以最后压栈
var removeDuplicateLetters = function (s) {
  if (!s || !(s.length > 0)) {
    return '';
  }
  const stack = [s[0]];
  for (let i = 1; i < s.length; i += 1) {
    if (stack.indexOf(s[i]) === -1) {
      if (
        stack[stack.length - 1] > s[i] &&
        s.slice(i).indexOf(stack[stack.length - 1]) !== -1
      ) {
        stack.pop();
        if (stack.length > 0) {
          i--;
          continue;
        }
      }
      stack.push(s[i]);
    }
  }
  return stack.join('');
};

console.log(removeDuplicateLetters('cbacdcbc'));
