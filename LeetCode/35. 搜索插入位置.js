// 方法一：暴力法
var searchInsert = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (target <= nums[i]) {
      return i;
    }
  }
  return nums.length;
};

// 方法二：二分法
var searchInsert = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = (l + r) >>> 1;

    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return l;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
