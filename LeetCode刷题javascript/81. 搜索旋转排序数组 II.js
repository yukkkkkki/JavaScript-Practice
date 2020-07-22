// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

// ( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

// 编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

// 示例 1:
// 输入: nums = [2,5,6,0,0,1,2], target = 0
// 输出: true

// 示例 2:
// 输入: nums = [2,5,6,0,0,1,2], target = 3
// 输出: false

//  方法一：二分查找
// 旋转数组中，存在一个大段（未旋转部分）和小段（被旋转至后端部分）的问题，因此多了一步中点值位于哪一块的问题。
var search = function (nums, target) {
  if (!nums.length) return false;
  let left = 0,
    right = nums.length - 1,
    mid;
  while (left <= right) {
    mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      return true;
    }
    if (nums[left] === nums[mid]) {
      ++left;
      continue;
    }
    if (nums[mid] >= nums[left]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return false;
};

// 方法二：直接用includes()
var search = function (nums, target) {
  return nums.includes(target);
};
