// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 示例:
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：双指针
// 思路：左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部。
// 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
// 注意：左指针左边均为非零数
// 右指针左边直到左指针处均为零
var moveZeroes = function (nums) {
  const n = nums.length;
  let left = 0,
    right = 0;
  while (right < n) {
    if (nums[right]) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
    right++;
  }
  return nums;
};
// 时间复杂度：O(n)；空间复杂度：O(1)
console.log(moveZeroes([0, 1, 0, 3, 12]));
