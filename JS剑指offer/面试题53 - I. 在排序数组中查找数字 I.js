// 统计一个数字在排序数组中出现的次数。

// 示例 1:
// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2

// 示例 2:
// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0

// 方法一：forEach()
var search = function (nums, target) {
  let res = 0;
  nums.forEach(function (value) {
    if (value == target) {
      res += 1;
    }
  });
  return res;
};

// 方法二：二分查找
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  let mid = parseInt((left + right) / 2);
  let index = -1;
  while (left <= right) {
    if (nums[mid] == target) {
      index = mid;
      break;
    }
    if (nums[mid] > target) {
      right = mid - 1;
      mid = parseInt((left + right) / 2);
    }
    if (nums[mid] < target) {
      left = mid + 1;
      mid = parseInt((left + right) / 2);
    }
  }
  if (index == -1) return 0;
  let i = index,
    j = index;
  while (i >= 0 && nums[i] == target) i--;
  while (j < nums.length && nums[j] == target) j++;
  return j - i - 1;
};
