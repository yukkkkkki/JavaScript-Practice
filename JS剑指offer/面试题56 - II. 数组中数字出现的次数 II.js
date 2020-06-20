// 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

// 示例 1：
// 输入：nums = [3,4,3,3]
// 输出：4

// 示例 2：
// 输入：nums = [9,1,7,9,7,9,7]
// 输出：1

// 方法一：哈希表
var singleNumber = function (nums) {
  let map = new Map();
  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  for (let [nums, times] of map.entries()) {
    if (times === 1) return nums;
  }
};

// 方法二：indexOf()和lastindexOf
var singleNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) return nums[i];
  }
};
