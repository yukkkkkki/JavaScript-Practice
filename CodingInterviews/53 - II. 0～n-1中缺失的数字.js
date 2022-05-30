/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二分查找
var missingNumber = function (nums) {
  if (nums.length - 1 === nums[nums.length - 1]) {
    return nums.length; // 如果就是有序，直接返回最后一个数
  }

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (mid === nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
