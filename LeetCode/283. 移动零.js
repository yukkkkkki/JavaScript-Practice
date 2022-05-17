/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：双指针
// 左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部
// 注意：左指针左边均为非零数，右指针左边直到左指针处均为零
var moveZeroes = function (nums) {
  const n = nums.length;
  let left = 0;
  let right = 0;

  while (right < n) {
    // 右指针不断向右移动
    // 每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
    if (nums[right]) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
    right++;
  }
  return nums;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
console.log(moveZeroes([0, 1, 0, 3, 12]));
