/**
 * @param {string} s
 * @return {string}
 */
// 方法一：栈
//遍历字符串
// 若遇到左括号，将其对应的索引入栈
// 若遇到右括号：栈中有值 -> 说明之前有落单左括号，刚好匹配此右括号
//             栈中无值 -> 说明当前右括号多余，删除
// 遍历完毕后，栈中剩下的值，是所有落单的左括号对应索引，将落单的左括号删除即可
var minRemoveToMakeValid = function (s) {
  const stack = [];
  const res = s.split('');
  const n = s.length;
  for (let i = 0; i < n; i++) {
    if (res[i] === '(') stack.push(i);
    if (res[i] === ')') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        res[i] = '';
      }
    }
  }
  const lenStack = stack.length;
  for (let i = 0; i < n; i++) {
    res[stack[i]] = '';
  }
  return res.join('');
};
