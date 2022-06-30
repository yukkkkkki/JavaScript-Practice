/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// 方法一：单调栈
var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      // 出栈 1 次，将当前温度与下一个位于栈顶的温度进行比较
      let prev = stack.pop();
      result[prev] = i - prev;
    }
    stack.push(i);
  }

  return result;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
