/**
 * @param {string} s
 * @return {string}
 */
// 方法一：栈
// 遇到 ‘(’ 则将字符入栈，遇到 ‘)’ 则将栈顶字符出栈，栈从空到下一次空的过程，则是扫描了一个原语的过程
var removeOuterParentheses = function (s) {
  let result = '';
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === ')') stack.pop();
    if (stack.length) result += c;
    if (c === '(') stack.push(c);
  }
  return result;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
