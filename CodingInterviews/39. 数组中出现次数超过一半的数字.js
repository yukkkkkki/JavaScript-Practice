/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：数组排序后返回 nums[n/2]
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
