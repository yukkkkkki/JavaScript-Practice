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
