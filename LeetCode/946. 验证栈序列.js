/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
// 方法一：栈模拟
var validateStackSequences = function (pushed, popped) {
  let stack = [];
  let j = 0;

  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length !== 0 && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }

  return !stack.length;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
