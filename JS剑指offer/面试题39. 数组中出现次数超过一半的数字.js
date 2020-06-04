// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 示例 1:
// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2

// 方法一：数组排序后返回nums[n/2]
var majorityElement = function (nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
};

// 方法二：Map()
var majorityElement = function (nums) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], 1);
    } else {
      map.set(nums[i], map.get(nums[i]) + 1);
    }
  }

  for ([key, value] of map) {
    if (value > Math.floor(nums.length / 2)) {
      return key;
    }
  }
};