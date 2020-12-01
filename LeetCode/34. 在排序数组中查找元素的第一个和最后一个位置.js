// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

// 你的算法时间复杂度必须是 O(log n) 级别。

// 如果数组中不存在目标值，返回 [-1, -1]。

// 示例 1:
// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: [3,4]

// 示例 2:
// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: [-1,-1]

// 方法一：二分查找
const binarySearch = (nums, target, lower) => {
  let left = 0,
    right = nums.length - 1,
    ans = nums.length;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
var searchRange = function (nums, target) {
  let res = [-1, -1];
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;
  if (
    leftIdx <= rightIdx &&
    rightIdx < nums.length &&
    nums[leftIdx] === target &&
    nums[rightIdx] === target
  ) {
    res = [leftIdx, rightIdx];
  }
  return res;
};
// 时间复杂度： O(logn)；空间复杂度：O(1)

// 方法二
var searchRange = function (nums, target) {
  if (!nums.length) return [-1, -1];
  let left = 0,
    right = nums.length - 1,
    start = 0,
    end = 0;
  while (left <= right) {
    let mid = (left + (right - left) / 2) | 0;
    if (nums[mid] === target) {
      start = mid;
      end = mid;
      while (start > left && nums[start] === nums[start - 1]) start--;
      while (end < right && nums[end] === nums[end + 1]) end++;
      return [start, end];
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return [-1, -1];
};

// 方法三
var searchRange = function (nums, target) {
  return [nums.indexOf(target), nums.lastIndexOf(target)];
};
