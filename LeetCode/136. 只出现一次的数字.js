/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：先排序，再暴力
var singleNumber = function (nums) {
  nums = nums.sort();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
  }
};

// 方法二：哈希
var singleNumber = function (nums) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) delete map[nums[i]];
    else map[nums[i]] = 1;
  }

  return Object.keys(map)[0];
};
