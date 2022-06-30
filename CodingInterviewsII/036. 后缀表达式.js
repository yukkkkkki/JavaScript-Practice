/**
 * @param {string[]} tokens
 * @return {number}
 */
// 方法一：栈
var evalRPN = function (tokens) {
  const stack = [];
  const n = tokens.length;

  for (let i = 0; i < n; i++) {
    const token = tokens[i];

    if (isNumber(token)) {
      stack.push(parseInt(token));
    } else {
      const num2 = stack.pop();
      const num1 = stack.pop();

      if (token === '+') {
        stack.push(num1 + num2);
      } else if (token === '-') {
        stack.push(num1 - num2);
      } else if (token === '*') {
        stack.push(num1 * num2);
      } else {
        stack.push(
          num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2)
        );
      }
    }
  }

  return stack.pop();
};
const isNumber = (token) => {
  return !(token === '+' || token === '-' || token === '*' || token === '/');
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

/**
 * @param {string[]} tokens
 * @return {number}
 */
// 方法二：数组模拟栈
var evalRPN = function (tokens) {
  const n = tokens.length;
  const stack = new Array(Math.floor(n + 1) / 2).fill(0);
  let idx = -1;

  for (let i = 0; i < n; i++) {
    const token = tokens[i];
    if (token === '+') {
      idx--;
      stack[idx] += stack[idx + 1];
    } else if (token === '-') {
      idx--;
      stack[idx] -= stack[idx + 1];
    } else if (token === '*') {
      idx--;
      stack[idx] *= stack[idx + 1];
    } else if (token === '/') {
      idx--;
      stack[idx] =
        stack[idx] / stack[idx + 1] > 0
          ? Math.floor(stack[idx] / stack[idx + 1])
          : Math.ceil(stack[idx] / stack[idx + 1]);
    } else {
      idx--;
      stack[idx] = parseInt(token);
    }
  }

  return stack[idx];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
