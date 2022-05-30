/**
 * @param {number[]} numbers
 * @return {number}
 */
// 方法一：二分查找 找两个单增区间的边界
var minArray = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = (left + right) >>> 1;

    if (nums[mid] > nums[right]) {
      // 最小元素肯定在 mid 的右边，所以 left = mid + 1
      left = mid + 1;
    } else if (nums[mid] == nums[right]) {
      // 最小元素不确定在它的左边还是右边，所以 right--，换一个 nums[right] 再试
      right--;
    } else {
      // 若 nums[mid] < nums[right]，mid 肯定处在旋转数组右边的增区间
      right = mid;
    }
  }

  return nums[left];
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)

// 方法二：直接用Math.min()
var minArray = function (numbers) {
  return Math.min(...numbers);
};
