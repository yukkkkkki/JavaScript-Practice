/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 方法一：二分查找
var searchInsert = function (nums, target) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    let mid = ((right - left) >> 1) + left;
    if (target <= nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return right + 1;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
