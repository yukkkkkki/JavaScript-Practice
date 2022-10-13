/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二分查找
var findMin = function (nums) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;

    nums[mid] < nums[high] ? (high = mid) : (low = mid + 1);
  }
  return nums[low];
};
// 时间复杂度：O(logn)
// 时间复杂度：O(1)
