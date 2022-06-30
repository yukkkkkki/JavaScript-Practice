/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 方法一：单调栈
var find132pattern = function (nums) {
  const stack = [];
  let med = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < med) return true;
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      // 如果当前遍历大于栈顶元素，则栈的单调性被破坏 -> 清空栈
      // 将栈底元素作为 med
      med = stack.pop();
    }
    // 将当前值压入栈底
    stack.push(nums[i]);
  }
  return false;
};
// 时间复杂度 O(N)
// 空间复杂度 O(N)
