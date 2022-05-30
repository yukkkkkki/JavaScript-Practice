// 统计一个数字在排序数组中出现的次数。
// 方法一：遍历数组
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
// 考虑 target 在数组中出现的次数，目的是找数组中「第一个等于 target 的位置」 和「第一个大于 target 的位置减一」
var binarySearch = function (nums, target, lower) {
  let left = 0;
  let right = nums.length - 1;
  let result = nums.length;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1;
      result = mid;
    } else {
      left = mid + 1;
    }
  }
  return result;
};
var search = function (nums, target) {
  let res = 0;
  // 寻找第一个 >= target 的下标
  const leftIdx = binarySearch(nums, target, true);
  // 寻找第一个 > target 的下标
  const rightIdx = binarySearch(nums, target, false) - 1;
  // target 可能不存在于数组中，所以要对 leftIdx 和 rightIdx 做校验
  if (
    leftIdx <= rightIdx &&
    rightIdx < nums.length &&
    nums[leftIdx] === target &&
    nums[rightIdx] === target
  ) {
    // target 在数组中出现的次数为 rightIdx − leftIdx + 1
    res = rightIdx - leftIdx + 1;
  }
  return res;
};

// 时间复杂度：O(logn)
// 空间复杂度：O(1)
