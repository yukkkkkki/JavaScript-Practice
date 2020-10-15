// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 说明：你不能倾斜容器，且 n 的值至少为 2。

// 图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

// 示例：
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49

/**
 * @param {number[]} height
 * @return {number}
 */
// 方法一：双指针
// 思路：
// 双指针代表可以作为容器边界的所有位置的范围
// 每次将对应的数字较小的那个指针往另一个指针的方向移动一个位置，表示我们认为这个指针不可能再作为容器的边界了
var maxArea = function (height) {
  let left = 0,
    right = height.length - 1;
  let res = 0;
  while (left < right) {
    let area = Math.min(height[left], height[right]) * (right - left);
    res = Math.max(res, area);
    if (height[left] <= height[right]) {
      ++left;
    } else {
      --right;
    }
  }
  return res;
};
