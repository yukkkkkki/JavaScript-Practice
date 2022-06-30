/**
 * @param {string} s
 * @return {boolean}
 */
// 方法一：栈
// 对给定的字符串 s 进行遍历
var isValid = function (s) {
  const n = s.length;
  // 有效字符串的长度一定为偶数，因此如果字符串的长度为奇数直接返回 false
  if (n % 2 === 1) return false;
  // 使用哈希映射（HashMap）存储每一种括号。
  // 键为右括号，值为相同类型的左括号
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  const stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      // 遇到一个右括号时，需要将一个相同类型的左括号闭合
      // 取出栈顶的左括号并判断它们是否是相同类型的括号
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        // 如果不是相同的类型，或者栈中并没有左括号，那么字符串 s 无效，返回 False
        return false;
      }
      stk.pop();
    } else {
      // 遇到一个左括号，将这个左括号放入栈顶
      stk.push(ch);
    }
  }

  return !stk.length;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n+∣Σ∣)
