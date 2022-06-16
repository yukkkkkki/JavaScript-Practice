/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 方法一：左右双指针
var twoSum = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) {
      return [nums[left], nums[right]];
    } else if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    }
  }
  return -1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
