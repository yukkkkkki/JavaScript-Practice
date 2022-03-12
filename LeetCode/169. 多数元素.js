/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
var majorityElement = function (nums) {
  const n = nums.length;
  let half = Math.floor(n / 2);
  const m = new Map();
  for (let i = 0; i < n; i++) {
    const item = nums[i];
    m.set(item, (m.get(item) || 0) + 1);
    if (m.get(item) > half) return item;
  }
};
