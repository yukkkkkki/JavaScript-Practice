/**
 * @param {number[]} heights
 * @return {number}
 */
// 方法一：单调栈
var largestRectangleArea = function (heights) {
  // 栈中保存的是柱子在数组中的下标，可以根据下标得到柱子的高度
  const stack = [-1];
  let area = 0;

  for (let i = 0; i < heights.length; i++) {
    // 当前柱子的高度小于位于栈顶的柱子的高度
    while (
      stack[stack.length - 1] !== -1 &&
      heights[stack[stack.length - 1]] >= heights[i]
    ) {
      // 以栈顶的柱子为高度计算面积
      let height = heights[stack.pop()];
      let width = i - stack[stack.length - 1] - 1;
      area = Math.max(area, height * width);
    }
    // 当前柱子的高度大于位于栈顶的柱子的高度  入栈
    stack.push(i);
  }

  // 计算末尾
  while (stack[stack.length - 1] !== -1) {
    let height = heights[stack.pop()];
    let width = heights.length - stack[stack.length - 1] - 1;
    area = Math.max(area, height * width);
  }

  return area;
};
