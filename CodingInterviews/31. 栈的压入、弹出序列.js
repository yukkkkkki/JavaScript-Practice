/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
  let i = 0;
  const stack = [];
  for (let val of pushed) {
    stack.push(val);
    // 判断模拟栈的栈顶元素是否跟 popped 数组此时要弹出的元素相等
    // 相等的话模拟栈就弹出
    // popped 数组对应 i 指针向后移动一位
    while (stack.length && stack[stack.length - 1] === popped[i]) {
      stack.pop();
      i += 1;
    }
  }
  return !stack.length;
};
