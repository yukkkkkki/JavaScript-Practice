/**
 * @param {number[]} height
 * @return {number}
 */
// 方法一：动态规划
var trap = function (height) {
  const n = height.length;
  if (n == 0) return 0;

  // leftMax[i] 表示下标 i 及其左边的位置中，height 的最大高度
  const leftMax = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; ++i) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // rightMax[i] 表示下标 i 及其右边的位置中，height 的最大高度
  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let ans = 0;
  for (let i = 0; i < n; ++i) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return ans;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：单调栈
var trap = function (height) {
  let res = 0;
  // 栈内存储的是下标，满足从栈底到栈顶的下标对应的数组 height 中的元素递减
  const stack = [];
  const n = height.length;

  for (let i = 0; i < n; i++) {
    // if(height[i] > height[top]) 则得到一个可以接雨水的区域
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) break;

      const left = stack[stack.length - 1];
      const currWidth = i - left - 1;
      const currHeight = Math.min(height[left], height[i]) - height[top];
      res += currWidth * currHeight;
    }

    stack.push(i);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法三：双指针
var trap = function (height) {
  let res = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      // 则必有 leftMax < rightMax
      // 下标 left 处能接的雨水量：
      res += leftMax - height[left];
      left++;
    } else {
      // 则必有 leftMax >= rightMax
      // 下标 right 处能接的雨水量：
      res += rightMax - height[right];
      right--;
    }
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
