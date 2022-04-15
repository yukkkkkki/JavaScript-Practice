/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二分查找
var findMin = function (nums) {
  let low = 0;
  let high = nums.length - 1;
  while (low < high) {
    const pivot = Math.floor((high - low) / 2) + low;
    if (nums[pivot] < nums[high]) {
      high = pivot;
    } else {
      low = pivot + 1;
    }
  }
  return nums[low];
};
// 时间复杂度：O(logn)
// 时间复杂度：O(1)
