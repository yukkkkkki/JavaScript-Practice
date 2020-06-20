// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

// 示例 1:
// 输入: [0,1,3]
// 输出: 2

// 示例 2:
// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

// 方法一：二项查找
var missingNumber = function (nums) {
  if (nums.length - 1 === nums[nums.length - 1]) return nums.length; // 如果就是有序，直接返回最后一个数
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + parseInt((right - left) / 2);
    mid === nums[mid] ? (left = mid + 1) : (right = mid - 1);
  }
  return left;
};

// 方法二 思路：
// left 指向 0，right 指向最后一个元素
// 计算中间坐标 mid：
// 如果mid = nums[mid]，说明[0, mid]范围内不缺失数字，left 更新为 mid + 1
// 如果mid < nums[mid]，说明[mid, right]范围内不缺失数字，right 更新为 mid - 1
// 检查 left 是否小于等于 mid，若成立，返回第 2 步；否则，向下执行
// 返回 left 即可
var missingNumber = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid === nums[mid]) {
      left = mid + 1;
    } else if (mid < nums[mid]) {
      right = mid - 1;
    }
  }
  return left;
};
