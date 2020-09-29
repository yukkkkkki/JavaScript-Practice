// 给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为 1。

// 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的直方图，在这种情况下，可以接 6 个单位的水（蓝色部分表示水）。 感谢 Marcos 贡献此图。

// 示例:
// 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出: 6

/**
 * @param {number[]} height
 * @return {number}
 */

// 方法一：双指针
// 指针从低向高，逐步向前
// leftMax 和 rightMax 永远在遍历当前元素之前就已经处理好了， 这时候只需要累加上 最高-当前高就可以了
var trap = function (height) {
  if (height.length < 3) return 0;
  let left = 0,
    right = height.length - 1;
  (leftMax = height[left]), (rightMax = height[right]), (ans = 0);
  while (left < right) {
    if (leftMax < rightMax) {
      ans += leftMax - height[left++];
      leftMax = Math.max(height[left], leftMax);
    } else {
      ans += rightMax - height[right--];
      rightMax = Math.max(height[right], rightMax);
    }
  }
  return ans;
};

// 参考链接：
// 作者：es-7
// 链接：https://leetcode-cn.com/problems/volume-of-histogram-lcci/solution/zuo-you-zhi-zhen-zhi-kao-lu-dang-qian-gao-du-ji-ke/
