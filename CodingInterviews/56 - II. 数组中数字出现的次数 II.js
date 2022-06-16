/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：哈希表
var singleNumber = function (nums) {
  const map = new Map();
  for (const num of nums) {
    map.set(num, map.has(num) ? map.get(num) + 1 : 1);
  }

  for (const [num, times] of map.entries()) {
    if (times === 1) return num;
  }
};

// 方法二：indexOf 和 lastindexOf
var singleNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) return nums[i];
  }
};
