/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二分查找
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((right - left) / 2) + left;

    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};
// 时间复杂度：O(logN)
